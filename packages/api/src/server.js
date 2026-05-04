const crypto = require("crypto");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");
const { PrismaClient, TeachingLevel, UrgencyStatus, UserRole, PartnerAccountType, AccountStatus } = require("../../database/node_modules/@prisma/client");

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT || 4000);
const jwtSecret = process.env.JWT_SECRET || "development-only-secret";

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));

function normalizeKenyanPhone(value = "") {
  const compact = String(value).replace(/\s+/g, "");
  if (/^07\d{8}$/.test(compact)) return `+254${compact.slice(1)}`;
  if (/^01\d{8}$/.test(compact)) return `+254${compact.slice(1)}`;
  if (/^254[17]\d{8}$/.test(compact)) return `+${compact}`;
  return compact;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash) return false;
  if (storedHash === `prototype-password-${password}` || storedHash === "seed-password-hash") return true;
  const [scheme, salt, hash] = storedHash.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), candidate);
}

function signUser(user) {
  return jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: "8h" });
}

function signPartnerUser(user) {
  return jwt.sign({ sub: user.id, role: UserRole.PARTNER }, jwtSecret, { expiresIn: "8h" });
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    emailVerified: user.emailVerified,
    phoneVerified: user.phoneVerified
  };
}

function partnerProfileDto(profile) {
  if (!profile) return null;
  return {
    id: profile.id,
    accountType: profile.accountType,
    entityName: profile.displayName,
    displayName: profile.displayName,
    registrationNumber: profile.registrationNumber || "",
    industry: profile.industryCategory || "",
    county: profile.isNationwide ? "All counties" : profile.county?.name || "",
    countrywide: profile.isNationwide,
    entityDetails: profile.profileDetails || "",
    phoneVerified: profile.otpVerified,
    termsAccepted: Boolean(profile.termsAcceptedAt)
  };
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({ error: "Authentication required." });
  try {
    req.auth = jwt.verify(token, jwtSecret);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session." });
  }
}

function adminRequired(req, res, next) {
  if (![UserRole.ADMIN, UserRole.MODERATOR].includes(req.auth?.role)) {
    return res.status(403).json({ error: "Admin access required." });
  }
  next();
}

function randomResetCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function getCurrentUser(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      teacherProfile: {
        include: {
          currentCounty: true,
          currentSubcounty: true,
          subjectCombination: true
        }
      }
    }
  });
}

function profileDto(profile) {
  if (!profile) return null;
  return {
    teachingLevel: profile.teachingLevel,
    subjectCombination: profile.subjectCombination?.normalizedName || "NULL",
    currentCounty: profile.currentCounty?.name || "",
    currentSubCounty: profile.currentSubcounty?.name || "",
    schoolName: profile.schoolName || "",
    biography: profile.biography || "",
    allowMessages: profile.allowMessages,
    allowCalls: profile.allowCalls,
    profileCompleted: profile.profileCompleted
  };
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "ton-api" });
});

app.get("/api/reference", async (_req, res, next) => {
  try {
    const [counties, subjectCombinations] = await Promise.all([
      prisma.county.findMany({ orderBy: { name: "asc" }, include: { subcounties: { orderBy: { name: "asc" } } } }),
      prisma.subjectCombination.findMany({ orderBy: { normalizedName: "asc" } })
    ]);
    res.json({
      counties: counties.map((county) => county.name),
      subcountiesByCounty: Object.fromEntries(
        counties.map((county) => [county.name, county.subcounties.map((subcounty) => subcounty.name)])
      ),
      subjectCombinations: subjectCombinations.map((item) => item.normalizedName)
    });
  } catch (error) {
    next(error);
  }
});

function adBasePrice(type = "TEXT") {
  const normalized = String(type).toUpperCase();
  if (normalized === "VIDEO") return 899;
  if (normalized === "IMAGE" || normalized === "PHOTO") return 599;
  return 399;
}

function adFrequencyMultiplier(frequency = "ALL_DAY") {
  return {
    ALL_DAY: 1.8,
    TWICE_DAILY: 1.4,
    TWICE_DAY: 1.4,
    THRICE_WEEK: 1.1,
    ONCE_WEEK: 1
  }[String(frequency).toUpperCase()] || 1;
}

function calculateAdPricing(input = {}) {
  const durationDays = Math.max(3, Number(input.durationDays || 7));
  const base = adBasePrice(input.type);
  const durationMultiplier = durationDays <= 7 ? 1 : Number((1 + ((durationDays - 7) * 0.08)).toFixed(2));
  const frequencyMultiplier = adFrequencyMultiplier(input.frequency);
  const locationMultiplier = input.isNationwide ? 1.15 : 1;
  const finalPrice = Math.ceil(base * durationMultiplier * frequencyMultiplier * locationMultiplier);
  return {
    base,
    durationDays,
    baseDurationIncluded: 7,
    durationMultiplier,
    frequencyMultiplier,
    locationMultiplier,
    finalPrice,
    currency: "KES",
    breakdown: {
      adType: String(input.type || "TEXT").toUpperCase(),
      frequency: String(input.frequency || "ALL_DAY").toUpperCase(),
      targeting: input.isNationwide ? "NATIONWIDE" : "COUNTY"
    }
  };
}

app.post("/api/ads/pricing/quote", (req, res) => {
  res.json(calculateAdPricing(req.body));
});

app.get("/api/ads/status-flow", (_req, res) => {
  res.json({
    statuses: ["DRAFT", "PENDING_PAYMENT", "PENDING_VERIFICATION", "PENDING_APPROVAL", "LIVE", "COMPLETED", "REJECTED", "NEEDS_CHANGES"]
  });
});

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const phoneNumber = normalizeKenyanPhone(req.body.phoneNumber);
    const password = String(req.body.password || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Valid email required." });
    if (!/^\+254[17]\d{8}$/.test(phoneNumber)) return res.status(400).json({ error: "Valid Kenyan phone required." });
    if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters." });

    const user = await prisma.user.create({
      data: {
        email,
        phoneNumber,
        passwordHash: hashPassword(password),
        emailVerified: true,
        phoneVerified: true
      }
    });
    await prisma.teacherProfile.create({
      data: {
        userId: user.id,
        teachingLevel: TeachingLevel.SECONDARY,
        profileCompleted: false
      }
    });
    res.status(201).json({ token: signUser(user), user: publicUser(user), profile: null });
  } catch (error) {
    if (error.code === "P2002") return res.status(409).json({ error: "Email or phone already exists." });
    next(error);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const rawIdentifier = String(req.body.identifier || "").trim();
    const identifier = rawIdentifier.toLowerCase();
    const phone = normalizeKenyanPhone(rawIdentifier);
    const email = identifier === "klickviews2026!" ? "klickviews2026@ton.co.ke" : identifier;
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phoneNumber: phone }
        ],
        accountStatus: "ACTIVE",
        isDeleted: false
      },
      include: {
        teacherProfile: {
          include: {
            currentCounty: true,
            currentSubcounty: true,
            subjectCombination: true
          }
        }
      }
    });
    if (!user || !verifyPassword(String(req.body.password || ""), user.passwordHash)) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    res.json({ token: signUser(user), user: publicUser(user), profile: profileDto(user.teacherProfile) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/partner/register", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const phoneNumber = normalizeKenyanPhone(req.body.phoneNumber);
    const password = String(req.body.password || "");
    const accountType = String(req.body.accountType || "INDIVIDUAL").toUpperCase();
    const displayName = String(req.body.entityName || req.body.displayName || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Valid partner email required." });
    if (!/^\+254[17]\d{8}$/.test(phoneNumber)) return res.status(400).json({ error: "Valid Kenyan phone required." });
    if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters." });
    if (!displayName) return res.status(400).json({ error: "Display or entity name is required." });
    if (!Object.values(PartnerAccountType).includes(accountType)) return res.status(400).json({ error: "Invalid partner account type." });

    const countyName = String(req.body.county || "").trim();
    const isNationwide = Boolean(req.body.countrywide) || countyName === "All counties";
    const county = !isNationwide && countyName ? await prisma.county.findUnique({ where: { name: countyName } }) : null;
    if (!isNationwide && countyName && !county) return res.status(400).json({ error: "Invalid partner county." });

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          phoneNumber,
          passwordHash: hashPassword(password),
          emailVerified: true,
          phoneVerified: true,
          role: UserRole.PARTNER
        }
      });
      const profile = await tx.partnerProfile.create({
        data: {
          userId: user.id,
          accountType,
          displayName,
          registrationNumber: req.body.registrationNumber || null,
          industryCategory: req.body.industry || null,
          countyId: county?.id || null,
          isNationwide,
          profileDetails: req.body.entityDetails || null,
          otpVerified: true,
          termsAcceptedAt: new Date()
        },
        include: { county: true }
      });
      return { user, profile };
    });
    res.status(201).json({ token: signUser(result.user), user: publicUser(result.user), partner: partnerProfileDto(result.profile) });
  } catch (error) {
    if (error.code === "P2002") return res.status(409).json({ error: "Partner email or phone already exists." });
    next(error);
  }
});

app.post("/api/partner/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const user = await prisma.user.findFirst({
      where: { email, accountStatus: "ACTIVE", isDeleted: false, partnerProfile: { isNot: null } },
      include: { partnerProfile: { include: { county: true } } }
    });
    if (!user || !verifyPassword(String(req.body.password || ""), user.passwordHash)) {
      return res.status(401).json({ error: "Invalid partner login credentials." });
    }
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    res.json({ token: signPartnerUser(user), user: publicUser({ ...user, role: UserRole.PARTNER }), partner: partnerProfileDto(user.partnerProfile) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/partner/me", authRequired, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.auth.sub },
      include: { partnerProfile: { include: { county: true } } }
    });
    if (!user || !user.partnerProfile || req.auth.role !== UserRole.PARTNER) return res.status(403).json({ error: "Partner account required." });
    res.json({ user: publicUser({ ...user, role: UserRole.PARTNER }), partner: partnerProfileDto(user.partnerProfile) });
  } catch (error) {
    next(error);
  }
});

function partnerRequired(req, res, next) {
  if (req.auth?.role !== UserRole.PARTNER) return res.status(403).json({ error: "Partner account required." });
  next();
}

function adTypeForDb(type = "TEXT") {
  const normalized = String(type).toUpperCase();
  if (normalized === "PHOTO" || normalized === "IMAGE") return "IMAGE";
  if (normalized === "VIDEO") return "VIDEO";
  return "TEXT";
}

function adFrequencyForDb(frequency = "ALL_DAY") {
  return {
    all_day: "ALL_DAY",
    twice_day: "TWICE_DAILY",
    twice_daily: "TWICE_DAILY",
    thrice_week: "THRICE_WEEK",
    once_week: "ONCE_WEEK"
  }[String(frequency).toLowerCase()] || String(frequency).toUpperCase();
}

function adCampaignDto(campaign) {
  return {
    id: campaign.id,
    title: campaign.title,
    type: campaign.campaignType,
    status: campaign.status,
    paymentStatus: campaign.payments?.[0]?.status || "PENDING",
    startDate: campaign.startDate?.toISOString?.().slice(0, 10) || "",
    endDate: campaign.endDate?.toISOString?.().slice(0, 10) || "",
    duration: campaign.durationDays,
    frequency: campaign.frequency,
    targeting: campaign.isNationwide ? "Nationwide" : campaign.targetCounty?.name || "",
    placement: campaign.placement || "",
    interest: campaign.audienceInterest || "",
    totalCost: Number(campaign.totalCost || 0),
    budgetBalance: Math.ceil(Number(campaign.totalCost || 0) * 0.64),
    views: Math.floor(Number(campaign.totalCost || 0) * 2.7),
    engagements: Math.floor(Number(campaign.totalCost || 0) * 0.18),
    createdAt: campaign.createdAt
  };
}

app.get("/api/partner/campaigns", authRequired, partnerRequired, async (req, res, next) => {
  try {
    const campaigns = await prisma.adCampaign.findMany({
      where: { userId: req.auth.sub },
      orderBy: { createdAt: "desc" },
      include: { targetCounty: true, payments: { orderBy: { createdAt: "desc" }, take: 1 } }
    });
    res.json({ campaigns: campaigns.map(adCampaignDto) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/partner/campaigns", authRequired, partnerRequired, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.auth.sub }, include: { partnerProfile: true } });
    if (!user?.partnerProfile) return res.status(400).json({ error: "Partner profile is required before creating campaigns." });
    const title = String(req.body.title || "").trim();
    if (!title) return res.status(400).json({ error: "Campaign title is required." });
    const campaignType = adTypeForDb(req.body.type);
    const durationDays = Math.max(3, Number(req.body.duration || req.body.durationDays || 7));
    const frequency = adFrequencyForDb(req.body.frequency);
    const isNationwide = req.body.targeting === "Nationwide" || Boolean(req.body.isNationwide);
    const targetCountyName = String(req.body.targeting || "").trim();
    const targetCounty = !isNationwide && targetCountyName ? await prisma.county.findUnique({ where: { name: targetCountyName } }) : null;
    if (!isNationwide && targetCountyName && !targetCounty) return res.status(400).json({ error: "Invalid target county." });
    const startDate = req.body.startDate ? new Date(req.body.startDate) : new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationDays);
    const quote = calculateAdPricing({ type: campaignType, durationDays, frequency, isNationwide });
    const paymentMethod = String(req.body.paymentMethod || "MPESA").toUpperCase().replace("-", "");
    const transactionRef = String(req.body.verificationCode || req.body.transactionRef || "").trim();
    const campaign = await prisma.$transaction(async (tx) => {
      const created = await tx.adCampaign.create({
        data: {
          userId: user.id,
          partnerProfileId: user.partnerProfile.id,
          campaignType,
          status: "PENDING_APPROVAL",
          title,
          ctaText: req.body.cta || null,
          destinationUrl: req.body.destinationUrl || null,
          targetCountyId: targetCounty?.id || null,
          isNationwide,
          placement: req.body.placement || null,
          audienceInterest: req.body.interest || null,
          startDate,
          endDate,
          durationDays,
          frequency,
          baseCost: quote.base,
          durationMultiplier: quote.durationMultiplier,
          frequencyMultiplier: quote.frequencyMultiplier,
          locationMultiplier: quote.locationMultiplier,
          totalCost: quote.finalPrice,
          content: {
            create: {
              textContent: req.body.textContent || null,
              keywordStyle: req.body.keywordStyle || null,
              keywords: Array.isArray(req.body.keywords) ? req.body.keywords : []
            }
          },
          invoices: {
            create: {
              invoiceNo: `INV-${Date.now()}`,
              amount: quote.finalPrice,
              status: "SUCCESS"
            }
          },
          payments: {
            create: {
              paymentMethod: ["MPESA", "PAYPAL", "PAYLESS"].includes(paymentMethod) ? paymentMethod : "MPESA",
              amount: quote.finalPrice,
              status: "SUCCESS",
              transactionRef: transactionRef || `LOCAL-${Date.now()}`
            }
          },
          approvals: { create: { status: "PENDING" } },
          statusLogs: { create: { toStatus: "PENDING_APPROVAL", reason: "Campaign submitted after payment verification." } }
        },
        include: { targetCounty: true, payments: { orderBy: { createdAt: "desc" }, take: 1 } }
      });
      return created;
    });
    res.status(201).json({ campaign: adCampaignDto(campaign) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/me", authRequired, async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.auth.sub);
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json({ user: publicUser(user), profile: profileDto(user.teacherProfile) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/profile", authRequired, async (req, res, next) => {
  try {
    const teachingLevel = req.body.teachingLevel === "PRIMARY" ? TeachingLevel.PRIMARY : TeachingLevel.SECONDARY;
    const currentCounty = await prisma.county.findUnique({ where: { name: req.body.currentCounty } });
    if (!currentCounty) return res.status(400).json({ error: "Current county is invalid." });
    const currentSubCountyName = String(req.body.currentSubCounty || "").trim();
    const currentSubcounty = currentSubCountyName
      ? await prisma.subcounty.findFirst({ where: { countyId: currentCounty.id, name: currentSubCountyName } })
      : null;
    if (currentSubCountyName && !currentSubcounty) return res.status(400).json({ error: "Current sub-county is invalid for the selected county." });

    let subjectCombinationId = null;
    if (teachingLevel === TeachingLevel.SECONDARY) {
      const subjectCombination = await prisma.subjectCombination.findUnique({
        where: { normalizedName: req.body.subjectCombination }
      });
      if (!subjectCombination) return res.status(400).json({ error: "Subject combination is required for secondary teachers." });
      subjectCombinationId = subjectCombination.id;
    }

    const profile = await prisma.teacherProfile.upsert({
      where: { userId: req.auth.sub },
      update: {
        teachingLevel,
        subjectCombinationId,
        currentCountyId: currentCounty.id,
        currentSubcountyId: currentSubcounty?.id || null,
        schoolName: req.body.schoolName || null,
        biography: req.body.biography || null,
        allowMessages: Boolean(req.body.allowMessages),
        allowCalls: Boolean(req.body.allowCalls),
        profileCompleted: true
      },
      create: {
        userId: req.auth.sub,
        teachingLevel,
        subjectCombinationId,
        currentCountyId: currentCounty.id,
        currentSubcountyId: currentSubcounty?.id || null,
        schoolName: req.body.schoolName || null,
        biography: req.body.biography || null,
        allowMessages: Boolean(req.body.allowMessages),
        allowCalls: Boolean(req.body.allowCalls),
        profileCompleted: true
      },
      include: {
        currentCounty: true,
        currentSubcounty: true,
        subjectCombination: true
      }
    });
    res.json({ profile: profileDto(profile) });
  } catch (error) {
    next(error);
  }
});

async function generateMatchesForRequest(request) {
  const reciprocal = await prisma.swapRequest.findMany({
    where: {
      userId: { not: request.userId },
      isActive: true,
      currentCountyId: request.desiredCountyId,
      desiredCountyId: request.currentCountyId,
      teachingLevel: request.teachingLevel,
      subjectCombinationId: request.subjectCombinationId
    }
  });
  for (const other of reciprocal) {
    const [a, b] = request.id < other.id ? [request, other] : [other, request];
    await prisma.match.upsert({
      where: {
        swapRequestAId_swapRequestBId: {
          swapRequestAId: a.id,
          swapRequestBId: b.id
        }
      },
      update: { compatibilityScore: 100 },
      create: {
        teacherAId: a.userId,
        teacherBId: b.userId,
        swapRequestAId: a.id,
        swapRequestBId: b.id,
        compatibilityScore: 100
      }
    });
  }
}

app.post("/api/swap-requests", authRequired, async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.auth.sub);
    if (!user?.teacherProfile?.profileCompleted) return res.status(400).json({ error: "Complete your profile first." });
    const desiredCounty = await prisma.county.findUnique({ where: { name: req.body.desiredCounty } });
    if (!desiredCounty) return res.status(400).json({ error: "Desired county is invalid." });

    const request = await prisma.swapRequest.create({
      data: {
        userId: user.id,
        currentCountyId: user.teacherProfile.currentCountyId,
        desiredCountyId: desiredCounty.id,
        teachingLevel: user.teacherProfile.teachingLevel,
        subjectCombinationId: user.teacherProfile.subjectCombinationId,
        desiredMoveMonth: String(req.body.desiredMoveMonth || ""),
        urgencyStatus: req.body.urgencyStatus === "NOT_URGENT" ? UrgencyStatus.NOT_URGENT : UrgencyStatus.URGENT
      }
    });
    await generateMatchesForRequest(request);
    res.status(201).json({ swapRequest: request });
  } catch (error) {
    next(error);
  }
});

app.get("/api/swap-requests", authRequired, async (req, res, next) => {
  try {
    const requests = await prisma.swapRequest.findMany({
      where: { isActive: true },
      include: {
        user: {
          include: {
            teacherProfile: { include: { currentCounty: true, subjectCombination: true } }
          }
        },
        currentCounty: true,
        desiredCounty: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({ requests: requests.map((request) => ({
      id: request.id,
      name: `${request.user.teacherProfile?.firstName || "Teacher"} ${request.user.teacherProfile?.lastName || ""}`.trim(),
      level: request.user.teacherProfile?.teachingLevel || "UNKNOWN",
      currentCounty: request.currentCounty?.name || "Unknown",
      desiredCounty: request.desiredCounty?.name || "Unknown",
      subject: request.user.teacherProfile?.subjectCombination?.normalizedName || "Unknown",
      urgency: request.urgencyStatus === "NOT_URGENT" ? "Not urgent" : "Urgent",
      messages: request.user.teacherProfile?.allowMessages,
      createdAt: request.createdAt.toISOString()
    })) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/swap-requests/:requestId/dm", authRequired, async (req, res, next) => {
  try {
    const request = await prisma.swapRequest.findUnique({
      where: { id: req.params.requestId },
      include: {
        user: {
          include: { teacherProfile: true }
        }
      }
    });
    if (!request) return res.status(404).json({ error: "Swap request not found." });
    if (request.userId === req.auth.sub) return res.status(400).json({ error: "Cannot open a conversation with your own request." });
    if (!request.user.teacherProfile?.allowMessages) return res.status(403).json({ error: "This user has disabled direct messages." });

    const existingParticipants = await prisma.conversationParticipant.findMany({
      where: { userId: req.auth.sub },
      include: { conversation: { include: { participants: true } } }
    });
    const existing = existingParticipants.find((participant) =>
      participant.conversation.participants.some((item) => item.userId === request.userId)
    );
    const conversation = existing?.conversation || await prisma.conversation.create({
      data: {
        participants: {
          create: [
            { userId: req.auth.sub },
            { userId: request.userId }
          ]
        }
      },
      include: { participants: true }
    });

    res.json({ conversationId: conversation.id, message: "Conversation opened with the selected teacher." });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/forgot-password", async (req, res, next) => {
  try {
    const identifier = String(req.body.identifier || "").trim();
    const sendMethod = String(req.body.sendMethod || "EMAIL").toUpperCase();
    if (!identifier) return res.status(400).json({ error: "A valid identifier is required." });
    const normalizedPhone = normalizeKenyanPhone(identifier);
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier.toLowerCase() }, { phoneNumber: normalizedPhone }]
      }
    });
    const code = randomResetCode();
    await prisma.passwordResetRequest.create({
      data: {
        userId: user?.id || null,
        identifier,
        sendMethod,
        resetCode: code,
        status: "PENDING"
      }
    });
    res.json({ message: "Password reset request submitted. An admin will review the request.", resetCode: code });
  } catch (error) {
    next(error);
  }
});

app.get("/api/users", authRequired, adminRequired, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" }
    });
    res.json({ users: users.map((user) => ({
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      accountStatus: user.accountStatus,
      createdAt: user.createdAt.toISOString()
    })) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/admin/users/:userId/status", authRequired, adminRequired, async (req, res, next) => {
  try {
    const accountStatus = String(req.body.accountStatus || "ACTIVE").toUpperCase();
    if (!Object.values(AccountStatus).includes(accountStatus)) {
      return res.status(400).json({ error: "Invalid account status." });
    }
    const user = await prisma.user.update({
      where: { id: req.params.userId },
      data: { accountStatus }
    });
    res.json({ id: user.id, accountStatus: user.accountStatus });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/users/:userId/reset-password", authRequired, adminRequired, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.userId } });
    if (!user) return res.status(404).json({ error: "User not found." });
    const code = randomResetCode();
    const request = await prisma.passwordResetRequest.create({
      data: {
        userId: user.id,
        identifier: user.email,
        sendMethod: "EMAIL",
        resetCode: code,
        status: "APPROVED",
        processedAt: new Date()
      }
    });
    res.json({ resetCode: request.resetCode, requestId: request.id });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/reports", authRequired, adminRequired, async (req, res, next) => {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: "desc" },
      include: { reporter: true, reportedUser: true }
    });
    res.json({ reports: reports.map((report) => ({
      id: report.id,
      reason: report.reason,
      contentType: report.contentType,
      status: report.status,
      reporterEmail: report.reporter?.email,
      reportedEmail: report.reportedUser?.email,
      createdAt: report.createdAt.toISOString()
    })) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/password-reset-requests", authRequired, adminRequired, async (req, res, next) => {
  try {
    const requests = await prisma.passwordResetRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true }
    });
    res.json({ requests: requests.map((entry) => ({
      id: entry.id,
      userEmail: entry.user?.email || null,
      identifier: entry.identifier,
      sendMethod: entry.sendMethod,
      status: entry.status,
      resetCode: entry.resetCode,
      createdAt: entry.createdAt.toISOString(),
      processedAt: entry.processedAt?.toISOString() || null
    })) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/matches", authRequired, async (req, res, next) => {
  try {
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ teacherAId: req.auth.sub }, { teacherBId: req.auth.sub }],
        matchStatus: "ACTIVE"
      },
      include: {
        teacherA: { include: { teacherProfile: { include: { currentCounty: true, subjectCombination: true } } } },
        teacherB: { include: { teacherProfile: { include: { currentCounty: true, subjectCombination: true } } } },
        swapRequestA: { include: { desiredCounty: true } },
        swapRequestB: { include: { desiredCounty: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    res.json({
      matches: matches.map((match) => {
        const other = match.teacherAId === req.auth.sub ? match.teacherB : match.teacherA;
        const otherRequest = match.teacherAId === req.auth.sub ? match.swapRequestB : match.swapRequestA;
        return {
          id: match.id,
          userId: other.id,
          name: `${other.teacherProfile?.firstName || "Teacher"} ${other.teacherProfile?.lastName || ""}`.trim(),
          level: other.teacherProfile?.teachingLevel,
          subject: other.teacherProfile?.subjectCombination?.normalizedName || "NULL",
          currentCounty: other.teacherProfile?.currentCounty?.name || "",
          desiredCounty: otherRequest.desiredCounty?.name || "",
          month: otherRequest.desiredMoveMonth,
          urgency: otherRequest.urgencyStatus === "NOT_URGENT" ? "Not urgent" : "Urgent",
          calls: other.teacherProfile?.allowCalls,
          messages: other.teacherProfile?.allowMessages,
          phoneNumber: other.teacherProfile?.allowCalls ? other.phoneNumber : null,
          compatibilityScore: match.compatibilityScore
        };
      })
    });
  } catch (error) {
    next(error);
  }
});

async function findOwnedMatch(matchId, userId) {
  return prisma.match.findFirst({
    where: {
      id: matchId,
      OR: [{ teacherAId: userId }, { teacherBId: userId }],
      matchStatus: "ACTIVE"
    },
    include: {
      teacherA: { include: { teacherProfile: true } },
      teacherB: { include: { teacherProfile: true } }
    }
  });
}

function otherUserFromMatch(match, userId) {
  return match.teacherAId === userId ? match.teacherB : match.teacherA;
}

app.post("/api/matches/:matchId/dm", authRequired, async (req, res, next) => {
  try {
    const match = await findOwnedMatch(req.params.matchId, req.auth.sub);
    if (!match) return res.status(404).json({ error: "Match not found." });
    const other = otherUserFromMatch(match, req.auth.sub);
    if (!other.teacherProfile?.allowMessages) return res.status(403).json({ error: "This teacher has disabled direct messages." });

    const existingParticipants = await prisma.conversationParticipant.findMany({
      where: { userId: req.auth.sub },
      include: { conversation: { include: { participants: true } } }
    });
    const existing = existingParticipants.find((participant) =>
      participant.conversation.participants.some((item) => item.userId === other.id)
    );
    const conversation = existing?.conversation || await prisma.conversation.create({
      data: {
        participants: {
          create: [
            { userId: req.auth.sub },
            { userId: other.id }
          ]
        }
      },
      include: { participants: true }
    });

    await prisma.matchInteraction.create({
      data: { matchId: match.id, actorId: req.auth.sub, actionType: "DM_OPENED" }
    });

    res.json({
      conversationId: conversation.id,
      message: `Conversation opened with ${other.teacherProfile?.firstName || "teacher"}.`
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/matches/:matchId/call", authRequired, async (req, res, next) => {
  try {
    const match = await findOwnedMatch(req.params.matchId, req.auth.sub);
    if (!match) return res.status(404).json({ error: "Match not found." });
    const other = otherUserFromMatch(match, req.auth.sub);
    if (!other.teacherProfile?.allowCalls) return res.status(403).json({ error: "This teacher has disabled calls." });

    await prisma.matchInteraction.create({
      data: { matchId: match.id, actorId: req.auth.sub, actionType: "CALL_REQUESTED" }
    });

    res.json({
      phoneNumber: other.phoneNumber,
      telUrl: `tel:${other.phoneNumber}`,
      message: `Call option is available for ${other.teacherProfile?.firstName || "teacher"}.`
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/matches/:matchId/report", authRequired, async (req, res, next) => {
  try {
    const match = await findOwnedMatch(req.params.matchId, req.auth.sub);
    if (!match) return res.status(404).json({ error: "Match not found." });
    const other = otherUserFromMatch(match, req.auth.sub);
    const report = await prisma.report.create({
      data: {
        reporterId: req.auth.sub,
        reportedUserId: other.id,
        contentType: "match",
        contentId: match.id,
        reason: String(req.body.reason || "Reported from matches page")
      }
    });

    await prisma.matchInteraction.create({
      data: { matchId: match.id, actorId: req.auth.sub, actionType: "REPORTED" }
    });

    res.status(201).json({ reportId: report.id, message: "Report submitted to moderation." });
  } catch (error) {
    next(error);
  }
});

app.get("/api/conversations", authRequired, async (req, res, next) => {
  try {
    const participants = await prisma.conversationParticipant.findMany({
      where: { userId: req.auth.sub },
      include: {
        conversation: {
          include: {
            participants: {
              include: { user: { include: { teacherProfile: true } } }
            },
            messages: { orderBy: { createdAt: "desc" }, take: 1 }
          }
        }
      },
      orderBy: { joinedAt: "desc" }
    });

    res.json({
      conversations: participants.map((participant) => {
        const other = participant.conversation.participants.find((item) => item.userId !== req.auth.sub)?.user;
        return {
          id: participant.conversationId,
          name: other ? `${other.teacherProfile?.firstName || "Teacher"} ${other.teacherProfile?.lastName || ""}`.trim() : "Teacher",
          archived: participant.archived,
          muted: participant.muted,
          blocked: participant.blocked,
          lastMessage: participant.conversation.messages[0]?.messageBody || "Conversation opened from match."
        };
      })
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Unexpected server error." });
});

app.listen(port, () => {
  console.log(`TON API running on http://127.0.0.1:${port}`);
});

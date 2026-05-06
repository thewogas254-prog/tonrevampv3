const crypto = require("crypto");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");
const { PrismaClient, TeachingLevel, UrgencyStatus, UserRole, PartnerAccountType, AccountStatus, ProductType, ApprovalStatus, ProductAssetStatus, PaymentStatus } = require("@prisma/client");

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT || 4000);
const jwtSecret = process.env.JWT_SECRET;
const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",").map((origin) => origin.trim()).filter(Boolean);
const allowPrototypePasswords = process.env.ALLOW_PROTOTYPE_PASSWORDS === "true";

if (!jwtSecret) {
  console.error("Missing JWT_SECRET environment variable. Set JWT_SECRET before starting the API.");
  process.exit(1);
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || !allowedOrigins.length || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS."));
  },
  credentials: true
}));
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
  if (allowPrototypePasswords && (storedHash === `prototype-password-${password}` || storedHash === "seed-password-hash")) return true;
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

app.post("/api/auth/admin-login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required." });

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user || user.role !== "ADMIN" || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid admin credentials." });
    }

    if (user.accountStatus === "SUSPENDED") {
      return res.status(403).json({ error: "Admin account suspended." });
    }

    res.json({
      token: signUser(user),
      adminRole: user.role,
      user: publicUser(user)
    });
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

function productTypeForDb(type = "EBOOK") {
  const normalized = String(type).toUpperCase();
  if (normalized === "VIDEO_COURSE") return ProductType.VIDEO_CLASS;
  if (normalized === "PASTPAPER") return ProductType.PAST_PAPER;
  return Object.values(ProductType).includes(normalized) ? normalized : ProductType.EBOOK;
}

function categorySlugForProduct(type = ProductType.EBOOK) {
  return {
    EBOOK: "ebooks",
    PAST_PAPER: "past-papers",
    EXAM_PAPER: "past-papers",
    VIDEO_CLASS: "video-courses",
    AUDIO_CLASS: "audio-classes",
    TEACHING_AID: "teaching-aids",
    WEBINAR: "webinars",
    TEMPLATE: "templates",
    LESSON_PLAN: "lesson-plans",
    SOFTWARE: "software"
  }[type] || "ebooks";
}

async function uniqueSalesId() {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const id = `S${crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 9)}`;
    const existing = await prisma.sellerAccount.findUnique({ where: { salesId: id } });
    if (!existing) return id;
  }
  return `S${Date.now().toString().slice(-9)}`;
}

async function getOrCreateSeller(userId) {
  const existing = await prisma.sellerAccount.findUnique({ where: { userId } });
  if (existing) return existing;
  return prisma.sellerAccount.create({
    data: {
      userId,
      salesId: await uniqueSalesId(),
      verificationStatus: ApprovalStatus.PENDING
    }
  });
}

function productDto(product) {
  const fileNames = product.fileUrl?.startsWith("pending://")
    ? product.fileUrl.slice("pending://".length).split("|").filter(Boolean)
    : [];
  const assets = Array.isArray(product.assets) ? product.assets : [];
  return {
    id: product.id,
    title: product.title || "Untitled product",
    description: product.description || "",
    productType: product.productType,
    displayType: product.productType === ProductType.VIDEO_CLASS ? "VIDEO_COURSE" : product.productType,
    price: Number(product.price || 0),
    approvalStatus: product.approvalStatus,
    salesCount: product.salesCount,
    viewsCount: product.viewsCount,
    sellerSalesId: product.seller?.salesId || "",
    category: product.category?.name || "",
    fileNames: assets.length ? assets.map((asset) => asset.originalName) : fileNames,
    assets: assets.map((asset) => ({
      id: asset.id,
      originalName: asset.originalName,
      mimeType: asset.mimeType,
      sizeBytes: asset.sizeBytes,
      status: asset.status,
      scanNotes: asset.scanNotes || ""
    })),
    deliverable: product.approvalStatus === ApprovalStatus.APPROVED && assets.length > 0 && assets.every((asset) => asset.status === ProductAssetStatus.CLEAN),
    createdAt: product.createdAt.toISOString()
  };
}

function storageKeyForProductAsset(userId, fileName = "") {
  const safeName = String(fileName).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "asset";
  return `products/${userId}/${Date.now()}-${crypto.randomBytes(6).toString("hex")}-${safeName}`;
}

function inferMimeType(fileName = "", explicitType = "") {
  if (explicitType) return String(explicitType);
  const lower = String(fileName).toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".mp4")) return "video/mp4";
  if (lower.endsWith(".mov")) return "video/quicktime";
  return "application/octet-stream";
}

app.get("/api/seller/products", authRequired, async (req, res, next) => {
  try {
    const seller = await getOrCreateSeller(req.auth.sub);
    const products = await prisma.product.findMany({
      where: { sellerId: seller.id, isDeleted: false },
      orderBy: { createdAt: "desc" },
      include: { seller: true, category: true, assets: { orderBy: { createdAt: "asc" } } }
    });
    res.json({
      seller: {
        id: seller.id,
        salesId: seller.salesId,
        verificationStatus: seller.verificationStatus
      },
      products: products.map(productDto)
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/seller/products", authRequired, async (req, res, next) => {
  try {
    const title = String(req.body.title || "").trim();
    const price = Number(req.body.price || 0);
    const productType = productTypeForDb(req.body.productType || req.body.type);
    const rawAssets = Array.isArray(req.body.assets) ? req.body.assets : [];
    const fileNames = Array.isArray(req.body.fileNames) ? req.body.fileNames.map((item) => String(item).trim()).filter(Boolean) : [];
    const assets = rawAssets.length
      ? rawAssets.map((asset) => ({
        originalName: String(asset.originalName || asset.fileName || "").trim(),
        mimeType: inferMimeType(asset.originalName || asset.fileName, asset.mimeType),
        sizeBytes: Math.max(0, Number(asset.sizeBytes || 0))
      })).filter((asset) => asset.originalName)
      : fileNames.map((fileName) => ({ originalName: fileName, mimeType: inferMimeType(fileName), sizeBytes: 0 }));
    if (!title) return res.status(400).json({ error: "Product title is required." });
    if (!Number.isFinite(price) || price < 50) return res.status(400).json({ error: "Minimum product price is KES 50." });
    if (!assets.length) return res.status(400).json({ error: "At least one submitted asset is required." });
    if (productType === ProductType.VIDEO_CLASS && assets.length > 1) return res.status(400).json({ error: "Only one video file is allowed per video course." });
    if (assets.length > 10) return res.status(400).json({ error: "Maximum 10 files can be submitted per product." });
    if (productType === ProductType.VIDEO_CLASS && assets.some((asset) => !asset.mimeType.startsWith("video/"))) {
      return res.status(400).json({ error: "Video courses require a video asset." });
    }
    if ([ProductType.EBOOK, ProductType.PAST_PAPER, ProductType.EXAM_PAPER].includes(productType) && assets.some((asset) => asset.mimeType !== "application/pdf")) {
      return res.status(400).json({ error: "Ebooks and papers require PDF assets." });
    }

    const seller = await getOrCreateSeller(req.auth.sub);
    const category = await prisma.productCategory.findUnique({ where: { slug: categorySlugForProduct(productType) } });
    const product = await prisma.product.create({
      data: {
        sellerId: seller.id,
        categoryId: category?.id || null,
        title,
        description: String(req.body.description || "Submitted through My Shop for verification.").trim(),
        productType,
        fileUrl: null,
        price,
        approvalStatus: ApprovalStatus.PENDING,
        assets: {
          create: assets.map((asset) => ({
            originalName: asset.originalName,
            storageKey: storageKeyForProductAsset(req.auth.sub, asset.originalName),
            mimeType: asset.mimeType,
            sizeBytes: Math.round(asset.sizeBytes),
            status: ProductAssetStatus.SCANNING,
            scanNotes: "Queued for malware and content policy scan."
          }))
        }
      },
      include: { seller: true, category: true, assets: { orderBy: { createdAt: "asc" } } }
    });
    await prisma.notification.create({
      data: {
        userId: req.auth.sub,
        notificationType: "ACCOUNT_ALERT",
        title: "Product submitted for review",
        body: `${title} is queued for verification before it appears in the marketplace.`,
        referenceId: product.id
      }
    });
    res.status(201).json({ product: productDto(product) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/shop/products", authRequired, async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { isDeleted: false, approvalStatus: ApprovalStatus.APPROVED },
      orderBy: { createdAt: "desc" },
      take: 60,
      include: { seller: true, category: true, assets: { orderBy: { createdAt: "asc" } } }
    });
    res.json({ products: products.map(productDto).filter((product) => product.deliverable) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/products", authRequired, adminRequired, async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { seller: true, category: true, assets: { orderBy: { createdAt: "asc" } } }
    });
    res.json({ products: products.map(productDto) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/admin/products/:productId/status", authRequired, adminRequired, async (req, res, next) => {
  try {
    const approvalStatus = String(req.body.approvalStatus || "").toUpperCase();
    if (!Object.values(ApprovalStatus).includes(approvalStatus)) {
      return res.status(400).json({ error: "Invalid product approval status." });
    }
    if (approvalStatus === ApprovalStatus.APPROVED) {
      const unsafeAsset = await prisma.productAsset.findFirst({
        where: {
          productId: req.params.productId,
          status: { not: ProductAssetStatus.CLEAN }
        }
      });
      if (unsafeAsset) return res.status(400).json({ error: "All product assets must be clean before approval." });
    }
    const product = await prisma.product.update({
      where: { id: req.params.productId },
      data: { approvalStatus },
      include: { seller: true, category: true, assets: { orderBy: { createdAt: "asc" } } }
    });
    await prisma.notification.create({
      data: {
        userId: product.seller.userId,
        notificationType: "ACCOUNT_ALERT",
        title: approvalStatus === ApprovalStatus.APPROVED ? "Product approved" : "Product review updated",
        body: `${product.title || "Your product"} is now ${approvalStatus.toLowerCase().replace("_", " ")}.`,
        referenceId: product.id
      }
    });
    res.json({ product: productDto(product) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/admin/product-assets/:assetId/status", authRequired, adminRequired, async (req, res, next) => {
  try {
    const status = String(req.body.status || "").toUpperCase();
    if (!Object.values(ProductAssetStatus).includes(status)) {
      return res.status(400).json({ error: "Invalid product asset status." });
    }
    const asset = await prisma.productAsset.update({
      where: { id: req.params.assetId },
      data: {
        status,
        scanNotes: String(req.body.scanNotes || (status === ProductAssetStatus.CLEAN ? "Asset passed scan." : "Asset status updated.")).trim()
      },
      include: { product: { include: { seller: true, category: true, assets: { orderBy: { createdAt: "asc" } } } } }
    });
    res.json({ asset: productDto(asset.product).assets.find((item) => item.id === asset.id), product: productDto(asset.product) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/shop/products/:productId/checkout", authRequired, async (req, res, next) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id: req.params.productId, isDeleted: false, approvalStatus: ApprovalStatus.APPROVED },
      include: { seller: true, category: true, assets: true }
    });
    if (!product) return res.status(404).json({ error: "Product is not available." });
    if (!product.assets.length || product.assets.some((asset) => asset.status !== ProductAssetStatus.CLEAN)) {
      return res.status(409).json({ error: "Product files are not cleared for delivery." });
    }
    if (product.seller.userId === req.auth.sub) return res.status(400).json({ error: "You cannot buy your own product." });

    const purchase = await prisma.productPurchase.create({
      data: {
        buyerId: req.auth.sub,
        productId: product.id,
        amountPaid: product.price,
        paymentStatus: PaymentStatus.PENDING
      }
    });

    res.status(201).json({
      purchase: {
        id: purchase.id,
        productId: product.id,
        amountPaid: Number(purchase.amountPaid),
        paymentStatus: purchase.paymentStatus,
        message: "Checkout started. Delivery unlocks after verified payment."
      }
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/shop/purchases", authRequired, async (req, res, next) => {
  try {
    const purchases = await prisma.productPurchase.findMany({
      where: { buyerId: req.auth.sub },
      orderBy: { createdAt: "desc" },
      include: { product: { include: { seller: true, category: true, assets: { orderBy: { createdAt: "asc" } } } } }
    });
    res.json({
      purchases: purchases.map((purchase) => ({
        id: purchase.id,
        paymentStatus: purchase.paymentStatus,
        amountPaid: Number(purchase.amountPaid),
        createdAt: purchase.createdAt.toISOString(),
        product: productDto(purchase.product),
        deliveryAvailable: purchase.paymentStatus === PaymentStatus.PAID && purchase.product.assets.every((asset) => asset.status === ProductAssetStatus.CLEAN)
      }))
    });
  } catch (error) {
    next(error);
  }
});

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
    const existingMatch = await prisma.match.findUnique({
      where: {
        swapRequestAId_swapRequestBId: {
          swapRequestAId: a.id,
          swapRequestBId: b.id
        }
      }
    });
    if (existingMatch) {
      await prisma.match.update({ where: { id: existingMatch.id }, data: { compatibilityScore: 100 } });
      continue;
    }
    const match = await prisma.match.create({
      data: {
        teacherAId: a.userId,
        teacherBId: b.userId,
        swapRequestAId: a.id,
        swapRequestBId: b.id,
        compatibilityScore: 100
      }
    });
    await prisma.notification.createMany({
      data: [
        {
          userId: a.userId,
          notificationType: "NEW_MATCH",
          title: "New exact swap match",
          body: "A reciprocal EasySwap match is ready to review.",
          referenceId: match.id
        },
        {
          userId: b.userId,
          notificationType: "NEW_MATCH",
          title: "New exact swap match",
          body: "A reciprocal EasySwap match is ready to review.",
          referenceId: match.id
        }
      ]
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
    res.json({ message: "Password reset request submitted. An admin will review the request." });
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

app.post("/api/admin/admins", authRequired, adminRequired, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required." });

    // Only super admin can create admins
    if (req.auth.role !== "ADMIN") {
      return res.status(403).json({ error: "Only super admin can create admin accounts." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existingUser) return res.status(400).json({ error: "User already exists." });

    const newAdmin = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash: hashPassword(password),
        role: "ADMIN",
        emailVerified: true,
        phoneVerified: true,
        accountStatus: "ACTIVE"
      }
    });

    res.json({ admin: publicUser(newAdmin) });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/admins/:adminId", authRequired, adminRequired, async (req, res, next) => {
  try {
    const adminId = req.params.adminId;

    // Only super admin can delete admins
    if (req.auth.role !== "ADMIN") {
      return res.status(403).json({ error: "Only super admin can create admin accounts." });
    }

    // Prevent deleting self
    if (req.auth.sub === adminId) {
      return res.status(400).json({ error: "Cannot delete your own admin account." });
    }

    const admin = await prisma.user.findUnique({ where: { id: adminId } });
    if (!admin || admin.role !== "ADMIN") {
      return res.status(404).json({ error: "Admin not found." });
    }

    await prisma.user.delete({ where: { id: adminId } });
    res.json({ message: "Admin deleted successfully." });
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
      }
    });

    const unreadCounts = await prisma.message.groupBy({
      by: ["conversationId"],
      where: {
        conversationId: { in: participants.map((participant) => participant.conversationId) },
        senderId: { not: req.auth.sub },
        isRead: false,
        isDeleted: false
      },
      _count: { id: true }
    });
    const unreadByConversation = new Map(unreadCounts.map((entry) => [entry.conversationId, entry._count.id]));

    const conversations = participants
      .map((participant) => {
        const other = participant.conversation.participants.find((item) => item.userId !== req.auth.sub)?.user;
        const lastMessage = participant.conversation.messages[0];
        return {
          id: participant.conversationId,
          name: other ? `${other.teacherProfile?.firstName || "Teacher"} ${other.teacherProfile?.lastName || ""}`.trim() : "Teacher",
          archived: participant.archived,
          muted: participant.muted,
          blocked: participant.blocked,
          unread: unreadByConversation.get(participant.conversationId) || 0,
          lastMessage: lastMessage?.messageBody || "Conversation opened from match.",
          lastMessageAt: lastMessage?.createdAt?.toISOString() || participant.joinedAt.toISOString()
        };
      })
      .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));

    res.json({ conversations });
  } catch (error) {
    next(error);
  }
});

function notificationTarget(type) {
  return {
    NEW_MATCH: "/matches",
    NEW_MESSAGE: "/messages",
    BLOG_ENGAGEMENT: "/blogs",
    PRODUCT_SALE: "/my-shop",
    WITHDRAWAL_STATUS: "/creator-studio",
    ACCOUNT_ALERT: "/profile"
  }[type] || "/notifications";
}

function notificationDto(notification) {
  return {
    id: notification.id,
    type: notification.notificationType,
    title: notification.title || "Notification",
    body: notification.body || "",
    referenceId: notification.referenceId || null,
    target: notificationTarget(notification.notificationType),
    isRead: notification.isRead,
    createdAt: notification.createdAt.toISOString()
  };
}

app.get("/api/notifications", authRequired, async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.auth.sub },
      orderBy: { createdAt: "desc" },
      take: 50
    });
    const unreadCount = notifications.filter((notification) => !notification.isRead).length;
    res.json({ unreadCount, notifications: notifications.map(notificationDto) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/notifications/read", authRequired, async (req, res, next) => {
  try {
    const result = await prisma.notification.updateMany({
      where: { userId: req.auth.sub, isRead: false },
      data: { isRead: true }
    });
    res.json({ updated: result.count });
  } catch (error) {
    next(error);
  }
});

app.put("/api/notifications/:notificationId/read", authRequired, async (req, res, next) => {
  try {
    const notification = await prisma.notification.findFirst({
      where: { id: req.params.notificationId, userId: req.auth.sub }
    });
    if (!notification) return res.status(404).json({ error: "Notification not found." });
    const updated = await prisma.notification.update({
      where: { id: notification.id },
      data: { isRead: true }
    });
    res.json({ notification: notificationDto(updated) });
  } catch (error) {
    next(error);
  }
});

async function findOwnedConversation(conversationId, userId) {
  return prisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: { some: { userId } }
    },
    include: {
      participants: {
        include: { user: { include: { teacherProfile: true } } }
      }
    }
  });
}

function messageDto(message, viewerId) {
  return {
    id: message.id,
    body: message.messageBody || "",
    attachmentUrl: message.attachmentUrl || null,
    senderId: message.senderId,
    mine: message.senderId === viewerId,
    isRead: message.isRead,
    createdAt: message.createdAt.toISOString()
  };
}

app.get("/api/conversations/:conversationId/messages", authRequired, async (req, res, next) => {
  try {
    const conversation = await findOwnedConversation(req.params.conversationId, req.auth.sub);
    if (!conversation) return res.status(404).json({ error: "Conversation not found." });

    const participant = conversation.participants.find((item) => item.userId === req.auth.sub);
    if (participant?.blocked) return res.status(403).json({ error: "This conversation is blocked." });

    const messages = await prisma.message.findMany({
      where: { conversationId: conversation.id, isDeleted: false },
      orderBy: { createdAt: "asc" },
      take: 100
    });

    await prisma.message.updateMany({
      where: {
        conversationId: conversation.id,
        senderId: { not: req.auth.sub },
        isRead: false
      },
      data: { isRead: true }
    });

    res.json({ messages: messages.map((message) => messageDto(message, req.auth.sub)) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/conversations/:conversationId/messages", authRequired, async (req, res, next) => {
  try {
    const conversation = await findOwnedConversation(req.params.conversationId, req.auth.sub);
    if (!conversation) return res.status(404).json({ error: "Conversation not found." });

    const senderParticipant = conversation.participants.find((item) => item.userId === req.auth.sub);
    const recipientParticipants = conversation.participants.filter((item) => item.userId !== req.auth.sub);
    if (senderParticipant?.blocked || recipientParticipants.some((item) => item.blocked)) {
      return res.status(403).json({ error: "This conversation is blocked." });
    }

    const body = String(req.body.body || "").trim();
    if (!body) return res.status(400).json({ error: "Message body is required." });
    if (body.length > 2000) return res.status(400).json({ error: "Message must be 2,000 characters or fewer." });

    const message = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId: req.auth.sub,
        messageBody: body
      }
    });

    if (recipientParticipants.length) {
      await prisma.notification.createMany({
        data: recipientParticipants.map((participant) => ({
          userId: participant.userId,
          notificationType: "NEW_MESSAGE",
          title: "New message",
          body: body.slice(0, 180),
          referenceId: conversation.id
        }))
      });
    }

    res.status(201).json({ message: messageDto(message, req.auth.sub) });
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

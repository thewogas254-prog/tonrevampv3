import { scryptSync } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { AdCampaignStatus, AdCampaignType, AdFrequency, AdPaymentMethod, AdPaymentStatus, ApprovalStatus, PartnerAccountType, PrismaClient, TeachingLevel, UrgencyStatus } from "@prisma/client";

const prisma = new PrismaClient();

const counties = [
  ["Baringo", "KE-001"], ["Bomet", "KE-002"], ["Bungoma", "KE-003"], ["Busia", "KE-004"],
  ["Elgeyo Marakwet", "KE-005"], ["Embu", "KE-006"], ["Garissa", "KE-007"], ["Homa Bay", "KE-008"],
  ["Isiolo", "KE-009"], ["Kajiado", "KE-010"], ["Kakamega", "KE-011"], ["Kericho", "KE-012"],
  ["Kiambu", "KE-013"], ["Kilifi", "KE-014"], ["Kirinyaga", "KE-015"], ["Kisii", "KE-016"],
  ["Kisumu", "KE-017"], ["Kitui", "KE-018"], ["Kwale", "KE-019"], ["Laikipia", "KE-020"],
  ["Lamu", "KE-021"], ["Machakos", "KE-022"], ["Makueni", "KE-023"], ["Mandera", "KE-024"],
  ["Marsabit", "KE-025"], ["Meru", "KE-026"], ["Migori", "KE-027"], ["Mombasa", "KE-028"],
  ["Muranga", "KE-029"], ["Nairobi", "KE-030"], ["Nakuru", "KE-031"], ["Nandi", "KE-032"],
  ["Narok", "KE-033"], ["Nyamira", "KE-034"], ["Nyandarua", "KE-035"], ["Nyeri", "KE-036"],
  ["Samburu", "KE-037"], ["Siaya", "KE-038"], ["Taita Taveta", "KE-039"], ["Tana River", "KE-040"],
  ["Tharaka Nithi", "KE-041"], ["Trans Nzoia", "KE-042"], ["Turkana", "KE-043"], ["Uasin Gishu", "KE-044"],
  ["Vihiga", "KE-045"], ["Wajir", "KE-046"], ["West Pokot", "KE-047"]
] as const;

const subjects = [
  ["ENG", "English"],
  ["LIT", "Literature"],
  ["MAT", "Mathematics"],
  ["BUS", "Business Studies"],
  ["PHY", "Physics"],
  ["BIO", "Biology"],
  ["CHE", "Chemistry"],
  ["HIS", "History"],
  ["CRE", "CRE"],
  ["GEO", "Geography"],
  ["KIS", "Kiswahili"],
  ["AGR", "Agriculture"],
  ["COM", "Computer Studies"],
  ["ECO", "Economics"],
  ["HSC", "Home Science"],
  ["IRE", "IRE"],
  ["ARA", "Arabic"],
  ["FRE", "French"],
  ["GER", "German"],
  ["PSC", "Political Science"],
  ["MUS", "Music"],
  ["FAR", "Fine Art"],
  ["ARD", "Art & Design"],
  ["SNE", "Special Needs Education"],
  ["GAC", "Guidance & Counseling"]
] as const;

const combinations = [
  ["Mathematics + Physics", "MAT", "PHY"],
  ["Mathematics + Chemistry", "MAT", "CHE"],
  ["Mathematics + Biology", "MAT", "BIO"],
  ["Mathematics + Geography", "MAT", "GEO"],
  ["Mathematics + Business Studies", "MAT", "BUS"],
  ["Mathematics + Computer Studies", "MAT", "COM"],
  ["Mathematics + Economics", "MAT", "ECO"],
  ["Mathematics + Home Science", "MAT", "HSC"],
  ["Physics + Chemistry", "PHY", "CHE"],
  ["Physics + Computer Studies", "PHY", "COM"],
  ["Physics + Geography", "PHY", "GEO"],
  ["Chemistry + Biology", "CHE", "BIO"],
  ["Chemistry + Agriculture", "CHE", "AGR"],
  ["Chemistry + Home Science", "CHE", "HSC"],
  ["Biology + Agriculture", "BIO", "AGR"],
  ["Biology + Geography", "BIO", "GEO"],
  ["Biology + Home Science", "BIO", "HSC"],
  ["English + Literature", "ENG", "LIT"],
  ["English + Kiswahili", "ENG", "KIS"],
  ["English + History", "ENG", "HIS"],
  ["English + Geography", "ENG", "GEO"],
  ["English + CRE", "ENG", "CRE"],
  ["English + French", "ENG", "FRE"],
  ["Kiswahili + History", "KIS", "HIS"],
  ["Kiswahili + CRE", "KIS", "CRE"],
  ["Kiswahili + Geography", "KIS", "GEO"],
  ["Kiswahili + IRE", "KIS", "IRE"],
  ["History + CRE", "HIS", "CRE"],
  ["History + Geography", "HIS", "GEO"],
  ["History + Political Science", "HIS", "PSC"],
  ["History + English", "HIS", "ENG"],
  ["Geography + CRE", "GEO", "CRE"],
  ["Geography + Agriculture", "GEO", "AGR"],
  ["Geography + Business Studies", "GEO", "BUS"],
  ["CRE + English", "CRE", "ENG"],
  ["CRE + Geography", "CRE", "GEO"],
  ["CRE + Kiswahili", "CRE", "KIS"],
  ["CRE + History", "CRE", "HIS"],
  ["IRE + Arabic", "IRE", "ARA"],
  ["IRE + Kiswahili", "IRE", "KIS"],
  ["IRE + History", "IRE", "HIS"],
  ["French + English", "FRE", "ENG"],
  ["French + German", "FRE", "GER"],
  ["French + Literature", "FRE", "LIT"],
  ["Arabic + IRE", "ARA", "IRE"],
  ["Arabic + History", "ARA", "HIS"],
  ["Agriculture + Biology", "AGR", "BIO"],
  ["Agriculture + Geography", "AGR", "GEO"],
  ["Agriculture + Chemistry", "AGR", "CHE"],
  ["Agriculture + Business Studies", "AGR", "BUS"],
  ["Business Studies + Mathematics", "BUS", "MAT"],
  ["Business Studies + Economics", "BUS", "ECO"],
  ["Business Studies + Geography", "BUS", "GEO"],
  ["Business Studies + Computer Studies", "BUS", "COM"],
  ["Computer Studies + Mathematics", "COM", "MAT"],
  ["Computer Studies + Physics", "COM", "PHY"],
  ["Computer Studies + Business Studies", "COM", "BUS"],
  ["Computer Studies + Geography", "COM", "GEO"],
  ["Home Science + Biology", "HSC", "BIO"],
  ["Home Science + Chemistry", "HSC", "CHE"],
  ["Home Science + Business Studies", "HSC", "BUS"],
  ["Music + English", "MUS", "ENG"],
  ["Music + CRE", "MUS", "CRE"],
  ["Music + Kiswahili", "MUS", "KIS"],
  ["Fine Art + History", "FAR", "HIS"],
  ["Fine Art + Geography", "FAR", "GEO"],
  ["Art & Design + History", "ARD", "HIS"],
  ["Special Needs Education + English", "SNE", "ENG"],
  ["Special Needs Education + Mathematics", "SNE", "MAT"],
  ["Special Needs Education + Biology", "SNE", "BIO"],
  ["Special Needs Education + Geography", "SNE", "GEO"],
  ["Guidance & Counseling + English", "GAC", "ENG"],
  ["Guidance & Counseling + CRE", "GAC", "CRE"],
  ["Guidance & Counseling + History", "GAC", "HIS"]
] as const;

const blogCategories = [
  ["TSC", "tsc"],
  ["CBC", "cbc"],
  ["STEM", "stem"],
  ["Education Technology", "education-technology"],
  ["International Curriculum", "international-curriculum"]
] as const;

const productCategories = [
  ["Ebooks", "ebooks"],
  ["Past Papers", "past-papers"],
  ["Video Courses", "video-courses"],
  ["Audio Classes", "audio-classes"],
  ["Teaching Aids", "teaching-aids"],
  ["Webinars", "webinars"],
  ["Templates", "templates"],
  ["Lesson Plans", "lesson-plans"]
] as const;

function localPasswordHash(password: string) {
  const salt = "ton-local-seed-salt";
  return `scrypt$${salt}$${scryptSync(password, salt, 64).toString("hex")}`;
}

function cleanImportedText(value: string) {
  return value
    .replace(/â€¢/g, "")
    .replace(/â€™/g, "'")
    .replace(/[•]/g, "")
    .trim();
}

function normalizeCountyName(value: string) {
  return cleanImportedText(value)
    .replace(/^\d+\./, "")
    .replace(/\s+City\s+County$/i, "")
    .replace(/\s+County$/i, "")
    .replace(/^Murang'a$/i, "Muranga")
    .trim();
}

function parseSubcountiesFile() {
  const filePath = resolve(process.cwd(), "..", "..", "Subcounties.txt");
  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  const parsed = new Map<string, string[]>();
  let currentCounty = "";

  for (const rawLine of lines) {
    const line = cleanImportedText(rawLine);
    if (!line) continue;

    const isCountyHeading = /County$/i.test(line) || /^\d+\./.test(line);
    if (isCountyHeading) {
      currentCounty = normalizeCountyName(line);
      if (!parsed.has(currentCounty)) parsed.set(currentCounty, []);
      continue;
    }

    if (!currentCounty) continue;
    const subcounty = line;
    const items = parsed.get(currentCounty) || [];
    if (!items.includes(subcounty)) items.push(subcounty);
    parsed.set(currentCounty, items);
  }

  return parsed;
}

async function main() {
  for (const [name, code] of counties) {
    await prisma.county.upsert({
      where: { name },
      update: { code },
      create: { name, code }
    });
  }

  const subcountiesByCounty = parseSubcountiesFile();
  for (const [countyName, subcountyNames] of subcountiesByCounty.entries()) {
    const county = await prisma.county.findUnique({ where: { name: countyName } });
    if (!county) continue;

    for (const subcountyName of subcountyNames) {
      await prisma.subcounty.upsert({
        where: {
          countyId_name: {
            countyId: county.id,
            name: subcountyName
          }
        },
        update: {},
        create: {
          countyId: county.id,
          name: subcountyName
        }
      });
    }
  }

  for (const [code, name] of subjects) {
    await prisma.subject.upsert({
      where: { code },
      update: { name },
      create: { code, name }
    });
  }

  for (const [normalizedName, subjectOneCode, subjectTwoCode] of combinations) {
    const subjectOne = await prisma.subject.findUniqueOrThrow({ where: { code: subjectOneCode } });
    const subjectTwo = await prisma.subject.findUniqueOrThrow({ where: { code: subjectTwoCode } });

    await prisma.subjectCombination.upsert({
      where: {
        subjectOneId_subjectTwoId: {
          subjectOneId: subjectOne.id,
          subjectTwoId: subjectTwo.id
        }
      },
      update: { normalizedName },
      create: {
        normalizedName,
        subjectOneId: subjectOne.id,
        subjectTwoId: subjectTwo.id
      }
    });
  }

  const legacyCombinationNames = [
    ["English/Literature", "English + Literature"],
    ["Mathematics/Business", "Mathematics + Business Studies"],
    ["Mathematics/Physics", "Mathematics + Physics"],
    ["Biology/Chemistry", "Chemistry + Biology"],
    ["History/CRE", "History + CRE"],
    ["Geography/CRE", "Geography + CRE"],
    ["Kiswahili/History", "Kiswahili + History"],
    ["Computer Studies/Mathematics", "Computer Studies + Mathematics"],
    ["Agriculture/Biology", "Agriculture + Biology"]
  ] as const;

  for (const [legacyName, replacementName] of legacyCombinationNames) {
    const legacy = await prisma.subjectCombination.findUnique({ where: { normalizedName: legacyName } });
    const replacement = await prisma.subjectCombination.findUnique({ where: { normalizedName: replacementName } });
    if (!legacy || !replacement) continue;

    await prisma.teacherProfile.updateMany({
      where: { subjectCombinationId: legacy.id },
      data: { subjectCombinationId: replacement.id }
    });
    await prisma.swapRequest.updateMany({
      where: { subjectCombinationId: legacy.id },
      data: { subjectCombinationId: replacement.id }
    });
    await prisma.subjectCombination.delete({ where: { id: legacy.id } });
  }

  for (const [name, slug] of blogCategories) {
    await prisma.blogCategory.upsert({
      where: { slug },
      update: { name },
      create: { name, slug }
    });
  }

  for (const [name, slug] of productCategories) {
    await prisma.productCategory.upsert({
      where: { slug },
      update: { name },
      create: { name, slug }
    });
  }

  const nairobi = await prisma.county.findUniqueOrThrow({ where: { name: "Nairobi" } });
  const kisumu = await prisma.county.findUniqueOrThrow({ where: { name: "Kisumu" } });
  const englishLiterature = await prisma.subjectCombination.findUniqueOrThrow({
    where: { normalizedName: "English + Literature" }
  });

  const tom = await prisma.user.upsert({
    where: { email: "tom@ton.co.ke" },
    update: {},
    create: {
      email: "tom@ton.co.ke",
      phoneNumber: "+254712345678",
      passwordHash: "seed-password-hash",
      emailVerified: true,
      phoneVerified: true
    }
  });

  const mary = await prisma.user.upsert({
    where: { email: "mary@ton.co.ke" },
    update: {},
    create: {
      email: "mary@ton.co.ke",
      phoneNumber: "+254798765432",
      passwordHash: "seed-password-hash",
      emailVerified: true,
      phoneVerified: true
    }
  });

  const klickviews = await prisma.user.upsert({
    where: { email: "klickviews2026@ton.co.ke" },
    update: {
      phoneNumber: "+254716226416",
      passwordHash: localPasswordHash("Klickviews2026!"),
      emailVerified: true,
      phoneVerified: true
    },
    create: {
      email: "klickviews2026@ton.co.ke",
      phoneNumber: "+254716226416",
      passwordHash: localPasswordHash("Klickviews2026!"),
      emailVerified: true,
      phoneVerified: true
    }
  });

  await prisma.teacherProfile.upsert({
    where: { userId: tom.id },
    update: {},
    create: {
      userId: tom.id,
      firstName: "Tom",
      lastName: "Omondi",
      teachingLevel: TeachingLevel.SECONDARY,
      subjectCombinationId: englishLiterature.id,
      currentCountyId: nairobi.id,
      schoolName: "Riverbank Secondary",
      profileCompleted: true
    }
  });

  const klickviewsPartner = await prisma.partnerProfile.upsert({
    where: { userId: klickviews.id },
    update: {
      accountType: PartnerAccountType.BUSINESS,
      displayName: "Klickviews Growth Studio",
      industryCategory: "Education",
      countyId: nairobi.id,
      isNationwide: true,
      profileDetails: "Demo partner account for viewing and testing TON Growth Ads.",
      otpVerified: true,
      termsAcceptedAt: new Date()
    },
    create: {
      userId: klickviews.id,
      accountType: PartnerAccountType.BUSINESS,
      displayName: "Klickviews Growth Studio",
      industryCategory: "Education",
      countyId: nairobi.id,
      isNationwide: true,
      profileDetails: "Demo partner account for viewing and testing TON Growth Ads.",
      otpVerified: true,
      termsAcceptedAt: new Date()
    }
  });

  const existingGrowthAd = await prisma.adCampaign.findFirst({
    where: {
      userId: klickviews.id,
      title: "CBC Revision Materials Visibility Push"
    }
  });

  if (!existingGrowthAd) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);
    await prisma.adCampaign.create({
      data: {
        userId: klickviews.id,
        partnerProfileId: klickviewsPartner.id,
        campaignType: AdCampaignType.IMAGE,
        status: AdCampaignStatus.PENDING_APPROVAL,
        title: "CBC Revision Materials Visibility Push",
        ctaText: "Download",
        destinationUrl: "https://teachersonlinenetwork.com",
        isNationwide: true,
        placement: "Platform-wide feed",
        audienceInterest: "Education",
        startDate,
        endDate,
        durationDays: 14,
        frequency: AdFrequency.ALL_DAY,
        baseCost: 599,
        durationMultiplier: 1.56,
        frequencyMultiplier: 1.8,
        locationMultiplier: 1.15,
        totalCost: 1935,
        content: {
          create: {
            textContent: "Help teachers and learners revise confidently with clear CBC practice materials, marking guides, and ready-to-use classroom resources.",
            keywordStyle: "highlight",
            keywords: ["CBC", "revision", "teachers"]
          }
        },
        invoices: {
          create: {
            invoiceNo: `INV-SEED-KLICKVIEWS`,
            amount: 1935,
            status: AdPaymentStatus.SUCCESS
          }
        },
        payments: {
          create: {
            paymentMethod: AdPaymentMethod.MPESA,
            amount: 1935,
            status: AdPaymentStatus.SUCCESS,
            transactionRef: "KLICK2026"
          }
        },
        approvals: {
          create: {
            status: ApprovalStatus.PENDING
          }
        },
        statusLogs: {
          create: {
            toStatus: AdCampaignStatus.PENDING_APPROVAL,
            reason: "Seeded demo growth promotion."
          }
        }
      }
    });
  }

  await prisma.teacherProfile.upsert({
    where: { userId: klickviews.id },
    update: {
      firstName: "Klickviews",
      lastName: "Teacher",
      teachingLevel: TeachingLevel.SECONDARY,
      subjectCombinationId: englishLiterature.id,
      currentCountyId: nairobi.id,
      schoolName: "TON Demo School",
      profileCompleted: true
    },
    create: {
      userId: klickviews.id,
      firstName: "Klickviews",
      lastName: "Teacher",
      teachingLevel: TeachingLevel.SECONDARY,
      subjectCombinationId: englishLiterature.id,
      currentCountyId: nairobi.id,
      schoolName: "TON Demo School",
      profileCompleted: true
    }
  });

  await prisma.teacherProfile.upsert({
    where: { userId: mary.id },
    update: {},
    create: {
      userId: mary.id,
      firstName: "Mary",
      lastName: "Achieng",
      teachingLevel: TeachingLevel.SECONDARY,
      subjectCombinationId: englishLiterature.id,
      currentCountyId: kisumu.id,
      schoolName: "Lakeside Secondary",
      profileCompleted: true
    }
  });

  const tomSwap = await prisma.swapRequest.findFirst({
    where: {
      userId: tom.id,
      currentCountyId: nairobi.id,
      desiredCountyId: kisumu.id,
      teachingLevel: TeachingLevel.SECONDARY,
      subjectCombinationId: englishLiterature.id
    }
  }) ?? await prisma.swapRequest.create({
    data: {
      userId: tom.id,
      currentCountyId: nairobi.id,
      desiredCountyId: kisumu.id,
      teachingLevel: TeachingLevel.SECONDARY,
      subjectCombinationId: englishLiterature.id,
      desiredMoveMonth: "2026-08",
      urgencyStatus: UrgencyStatus.URGENT
    }
  });

  const marySwap = await prisma.swapRequest.findFirst({
    where: {
      userId: mary.id,
      currentCountyId: kisumu.id,
      desiredCountyId: nairobi.id,
      teachingLevel: TeachingLevel.SECONDARY,
      subjectCombinationId: englishLiterature.id
    }
  }) ?? await prisma.swapRequest.create({
    data: {
      userId: mary.id,
      currentCountyId: kisumu.id,
      desiredCountyId: nairobi.id,
      teachingLevel: TeachingLevel.SECONDARY,
      subjectCombinationId: englishLiterature.id,
      desiredMoveMonth: "2026-08",
      urgencyStatus: UrgencyStatus.URGENT
    }
  });

  await prisma.match.upsert({
    where: {
      swapRequestAId_swapRequestBId: {
        swapRequestAId: tomSwap.id,
        swapRequestBId: marySwap.id
      }
    },
    update: {
      compatibilityScore: 100
    },
    create: {
      teacherAId: tom.id,
      teacherBId: mary.id,
      swapRequestAId: tomSwap.id,
      swapRequestBId: marySwap.id,
      compatibilityScore: 100
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

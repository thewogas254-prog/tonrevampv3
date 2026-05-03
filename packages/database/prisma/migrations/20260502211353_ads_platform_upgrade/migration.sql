-- CreateEnum
CREATE TYPE "partner_account_type" AS ENUM ('INDIVIDUAL', 'BUSINESS', 'COMPANY');

-- CreateEnum
CREATE TYPE "ad_campaign_type" AS ENUM ('TEXT', 'IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "ad_campaign_status" AS ENUM ('DRAFT', 'PENDING_PAYMENT', 'PENDING_VERIFICATION', 'PENDING_APPROVAL', 'LIVE', 'COMPLETED', 'REJECTED', 'NEEDS_CHANGES');

-- CreateEnum
CREATE TYPE "ad_frequency" AS ENUM ('ALL_DAY', 'TWICE_DAILY', 'THRICE_WEEK', 'ONCE_WEEK');

-- CreateEnum
CREATE TYPE "ad_payment_method" AS ENUM ('MPESA', 'PAYPAL', 'PAYLESS');

-- CreateEnum
CREATE TYPE "ad_payment_status" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "ad_media_type" AS ENUM ('IMAGE', 'VIDEO', 'THUMBNAIL');

-- CreateTable
CREATE TABLE "partner_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "account_type" "partner_account_type" NOT NULL,
    "display_name" VARCHAR(150) NOT NULL,
    "registration_number" VARCHAR(100),
    "industry_category" VARCHAR(100),
    "county_id" UUID,
    "is_nationwide" BOOLEAN NOT NULL DEFAULT false,
    "profile_details" TEXT,
    "otp_verified" BOOLEAN NOT NULL DEFAULT false,
    "terms_accepted_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "partner_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_otp_verifications" (
    "id" UUID NOT NULL,
    "partner_profile_id" UUID NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "code_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "verified_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partner_otp_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad_campaigns" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "partner_profile_id" UUID NOT NULL,
    "campaign_type" "ad_campaign_type" NOT NULL,
    "status" "ad_campaign_status" NOT NULL DEFAULT 'DRAFT',
    "title" VARCHAR(255) NOT NULL,
    "cta_text" VARCHAR(80),
    "destination_url" TEXT,
    "target_county_id" UUID,
    "is_nationwide" BOOLEAN NOT NULL DEFAULT false,
    "placement" VARCHAR(120),
    "audience_interest" VARCHAR(120),
    "start_date" DATE,
    "end_date" DATE,
    "duration_days" INTEGER NOT NULL DEFAULT 7,
    "frequency" "ad_frequency" NOT NULL DEFAULT 'ALL_DAY',
    "base_cost" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "duration_multiplier" DECIMAL(6,2) NOT NULL DEFAULT 1,
    "frequency_multiplier" DECIMAL(6,2) NOT NULL DEFAULT 1,
    "location_multiplier" DECIMAL(6,2) NOT NULL DEFAULT 1,
    "total_cost" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ad_campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad_campaign_content" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "text_content" TEXT,
    "keyword_style" VARCHAR(50),
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "formatted_marks" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ad_campaign_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad_campaign_media" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "media_type" "ad_media_type" NOT NULL,
    "media_url" TEXT NOT NULL,
    "original_name" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "width" INTEGER,
    "height" INTEGER,
    "duration_seconds" INTEGER,
    "validation_status" "approval_status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ad_campaign_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad_invoices" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "invoice_no" VARCHAR(40) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" "ad_payment_status" NOT NULL DEFAULT 'PENDING',
    "due_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ad_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad_payments" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "payment_method" "ad_payment_method" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" "ad_payment_status" NOT NULL DEFAULT 'PENDING',
    "transaction_ref" VARCHAR(120),
    "provider_meta" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed_at" TIMESTAMP(6),

    CONSTRAINT "ad_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad_approvals" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "reviewer_id" UUID,
    "status" "approval_status" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "reviewed_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ad_approvals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad_campaign_status_logs" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "from_status" "ad_campaign_status",
    "to_status" "ad_campaign_status" NOT NULL,
    "actor_id" UUID,
    "reason" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ad_campaign_status_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partner_profiles_user_id_key" ON "partner_profiles"("user_id");

-- CreateIndex
CREATE INDEX "partner_profiles_account_type_idx" ON "partner_profiles"("account_type");

-- CreateIndex
CREATE INDEX "partner_profiles_county_id_idx" ON "partner_profiles"("county_id");

-- CreateIndex
CREATE INDEX "partner_otp_verifications_partner_profile_id_idx" ON "partner_otp_verifications"("partner_profile_id");

-- CreateIndex
CREATE INDEX "partner_otp_verifications_expires_at_idx" ON "partner_otp_verifications"("expires_at");

-- CreateIndex
CREATE INDEX "ad_campaigns_user_id_idx" ON "ad_campaigns"("user_id");

-- CreateIndex
CREATE INDEX "ad_campaigns_partner_profile_id_idx" ON "ad_campaigns"("partner_profile_id");

-- CreateIndex
CREATE INDEX "ad_campaigns_campaign_type_idx" ON "ad_campaigns"("campaign_type");

-- CreateIndex
CREATE INDEX "ad_campaigns_status_idx" ON "ad_campaigns"("status");

-- CreateIndex
CREATE INDEX "ad_campaigns_target_county_id_idx" ON "ad_campaigns"("target_county_id");

-- CreateIndex
CREATE UNIQUE INDEX "ad_campaign_content_campaign_id_key" ON "ad_campaign_content"("campaign_id");

-- CreateIndex
CREATE INDEX "ad_campaign_media_campaign_id_idx" ON "ad_campaign_media"("campaign_id");

-- CreateIndex
CREATE INDEX "ad_campaign_media_media_type_idx" ON "ad_campaign_media"("media_type");

-- CreateIndex
CREATE UNIQUE INDEX "ad_invoices_invoice_no_key" ON "ad_invoices"("invoice_no");

-- CreateIndex
CREATE INDEX "ad_invoices_campaign_id_idx" ON "ad_invoices"("campaign_id");

-- CreateIndex
CREATE INDEX "ad_invoices_status_idx" ON "ad_invoices"("status");

-- CreateIndex
CREATE INDEX "ad_payments_campaign_id_idx" ON "ad_payments"("campaign_id");

-- CreateIndex
CREATE INDEX "ad_payments_status_idx" ON "ad_payments"("status");

-- CreateIndex
CREATE INDEX "ad_payments_transaction_ref_idx" ON "ad_payments"("transaction_ref");

-- CreateIndex
CREATE INDEX "ad_approvals_campaign_id_idx" ON "ad_approvals"("campaign_id");

-- CreateIndex
CREATE INDEX "ad_approvals_reviewer_id_idx" ON "ad_approvals"("reviewer_id");

-- CreateIndex
CREATE INDEX "ad_approvals_status_idx" ON "ad_approvals"("status");

-- CreateIndex
CREATE INDEX "ad_campaign_status_logs_campaign_id_idx" ON "ad_campaign_status_logs"("campaign_id");

-- CreateIndex
CREATE INDEX "ad_campaign_status_logs_to_status_idx" ON "ad_campaign_status_logs"("to_status");

-- AddForeignKey
ALTER TABLE "partner_profiles" ADD CONSTRAINT "partner_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_profiles" ADD CONSTRAINT "partner_profiles_county_id_fkey" FOREIGN KEY ("county_id") REFERENCES "counties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_otp_verifications" ADD CONSTRAINT "partner_otp_verifications_partner_profile_id_fkey" FOREIGN KEY ("partner_profile_id") REFERENCES "partner_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_campaigns" ADD CONSTRAINT "ad_campaigns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_campaigns" ADD CONSTRAINT "ad_campaigns_partner_profile_id_fkey" FOREIGN KEY ("partner_profile_id") REFERENCES "partner_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_campaigns" ADD CONSTRAINT "ad_campaigns_target_county_id_fkey" FOREIGN KEY ("target_county_id") REFERENCES "counties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_campaign_content" ADD CONSTRAINT "ad_campaign_content_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "ad_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_campaign_media" ADD CONSTRAINT "ad_campaign_media_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "ad_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_invoices" ADD CONSTRAINT "ad_invoices_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "ad_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_payments" ADD CONSTRAINT "ad_payments_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "ad_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_approvals" ADD CONSTRAINT "ad_approvals_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "ad_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_approvals" ADD CONSTRAINT "ad_approvals_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_campaign_status_logs" ADD CONSTRAINT "ad_campaign_status_logs_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "ad_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

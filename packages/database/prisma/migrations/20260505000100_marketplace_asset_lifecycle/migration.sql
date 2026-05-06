-- CreateEnum
CREATE TYPE "product_asset_status" AS ENUM ('PENDING_UPLOAD', 'UPLOADED', 'SCANNING', 'CLEAN', 'REJECTED');

-- CreateTable
CREATE TABLE "product_assets" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "original_name" VARCHAR(255) NOT NULL,
    "storage_key" TEXT NOT NULL,
    "mime_type" VARCHAR(120) NOT NULL,
    "size_bytes" INTEGER NOT NULL DEFAULT 0,
    "status" "product_asset_status" NOT NULL DEFAULT 'PENDING_UPLOAD',
    "scan_notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "product_assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_assets_storage_key_key" ON "product_assets"("storage_key");

-- CreateIndex
CREATE INDEX "product_assets_product_id_idx" ON "product_assets"("product_id");

-- CreateIndex
CREATE INDEX "product_assets_status_idx" ON "product_assets"("status");

-- AddForeignKey
ALTER TABLE "product_assets" ADD CONSTRAINT "product_assets_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

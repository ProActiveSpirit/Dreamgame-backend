/*
  Warnings:

  - You are about to drop the column `State` on the `BillingInformation` table. All the data in the column will be lost.
  - You are about to drop the column `SKU` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pricingId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `expedtedCost` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceId` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `invoiced` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the `CustomerUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[generatedEmail]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ipAddressId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `state` to the `BillingInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `gameCode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedCost` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `SalesOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `SalesOrder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'TEST');

-- DropForeignKey
ALTER TABLE "ActivationKeys" DROP CONSTRAINT "ActivationKeys_customerUserId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerUser" DROP CONSTRAINT "CustomerUser_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_customerUserId_fkey";

-- DropForeignKey
ALTER TABLE "SalesOrder" DROP CONSTRAINT "SalesOrder_invoiceId_fkey";

-- DropIndex
DROP INDEX "Product_SKU_key";

-- AlterTable
ALTER TABLE "BillingInformation" DROP COLUMN "State",
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "generatedEmail" TEXT,
ADD COLUMN     "ipAddressId" TEXT,
ADD COLUMN     "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "CustomerStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "SKU",
DROP COLUMN "pricingId",
ADD COLUMN     "gameCode" TEXT NOT NULL,
ADD COLUMN     "promotionEnd" TIMESTAMP(3),
ADD COLUMN     "promotionStart" TIMESTAMP(3),
ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "expedtedCost",
ADD COLUMN     "expectedCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SalesOrder" DROP COLUMN "invoiceId",
DROP COLUMN "invoiced",
ADD COLUMN     "calculatedAvgCost" DOUBLE PRECISION,
ADD COLUMN     "sku" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "CustomerUser";

-- DropTable
DROP TABLE "Invoice";

-- DropEnum
DROP TYPE "InvoiceStatus";

-- CreateTable
CREATE TABLE "IPAddress" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IPAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderLink" (
    "id" TEXT NOT NULL,
    "salesOrderId" TEXT NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,

    CONSTRAINT "PurchaseOrderLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APILog" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "requestData" JSONB NOT NULL,
    "responseData" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "APILog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CRMData" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "interactionNotes" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CRMData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NintendoData" (
    "id" TEXT NOT NULL,
    "fs_id" TEXT NOT NULL,
    "change_date" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dates_released_dts" TIMESTAMP(3)[],
    "club_nintendo" BOOLEAN NOT NULL,
    "pretty_date_s" TEXT NOT NULL,
    "play_mode_tv_mode_b" BOOLEAN NOT NULL,
    "play_mode_handheld_mode_b" BOOLEAN NOT NULL,
    "product_code_txt" TEXT[],
    "image_url_sq_s" TEXT NOT NULL,
    "deprioritise_b" BOOLEAN NOT NULL,
    "demo_availability" BOOLEAN NOT NULL,
    "pg_s" TEXT NOT NULL,
    "compatible_controller" TEXT[],
    "originally_for_t" TEXT NOT NULL,
    "paid_subscription_required_b" BOOLEAN NOT NULL,
    "cloud_saves_b" BOOLEAN NOT NULL,
    "priority" TIMESTAMP(3) NOT NULL,
    "digital_version_b" BOOLEAN NOT NULL,
    "title_extras_txt" TEXT[],
    "image_url_h2x1_s" TEXT NOT NULL,
    "system_type" TEXT[],
    "age_rating_sorting_i" INTEGER NOT NULL,
    "game_categories_txt" TEXT[],
    "play_mode_tabletop_mode_b" BOOLEAN NOT NULL,
    "publisher" TEXT NOT NULL,
    "product_code_ss" TEXT[],
    "excerpt" TEXT NOT NULL,
    "nsuid_txt" TEXT[],
    "date_from" TIMESTAMP(3) NOT NULL,
    "language_availability" TEXT[],
    "price_has_discount_b" BOOLEAN NOT NULL,
    "product_catalog_description_s" TEXT NOT NULL,
    "related_nsuids_txt" TEXT[],
    "price_discount_percentage_f" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "sorting_title" TEXT NOT NULL,
    "wishlist_email_square_image_url_s" TEXT NOT NULL,
    "players_to" INTEGER NOT NULL,
    "wishlist_email_banner640w_image_url_s" TEXT NOT NULL,
    "paid_subscription_online_play_b" BOOLEAN NOT NULL,
    "playable_on_txt" TEXT[],
    "hits_i" INTEGER NOT NULL,
    "pretty_game_categories_txt" TEXT[],
    "title_master_s" TEXT NOT NULL,
    "switch_game_voucher_b" BOOLEAN NOT NULL,
    "game_category" TEXT[],
    "system_names_txt" TEXT[],
    "pretty_agerating_s" TEXT NOT NULL,
    "price_regular_f" DOUBLE PRECISION NOT NULL,
    "eshop_removed_b" BOOLEAN NOT NULL,
    "age_rating_type" TEXT NOT NULL,
    "price_sorting_f" DOUBLE PRECISION NOT NULL,
    "price_lowest_f" DOUBLE PRECISION NOT NULL,
    "age_rating_value" TEXT NOT NULL,
    "physical_version_b" BOOLEAN NOT NULL,
    "wishlist_email_banner460w_image_url_s" TEXT NOT NULL,
    "downloads_rank_i" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "NintendoData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IPAddress_ip_key" ON "IPAddress"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedEmail_email_key" ON "GeneratedEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_generatedEmail_key" ON "Customer"("generatedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_ipAddressId_key" ON "Customer"("ipAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_ipAddressId_fkey" FOREIGN KEY ("ipAddressId") REFERENCES "IPAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedEmail" ADD CONSTRAINT "GeneratedEmail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderLink" ADD CONSTRAINT "PurchaseOrderLink_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderLink" ADD CONSTRAINT "PurchaseOrderLink_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APILog" ADD CONSTRAINT "APILog_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CRMData" ADD CONSTRAINT "CRMData_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

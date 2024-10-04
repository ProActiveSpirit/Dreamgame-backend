/*
  Warnings:

  - The primary key for the `Pricing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StockQty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'SENT', 'PAID', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_productId_fkey";

-- DropForeignKey
ALTER TABLE "StockQty" DROP CONSTRAINT "StockQty_productId_fkey";

-- AlterTable
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pricing_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ADD COLUMN     "pricingId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "StockQty" DROP CONSTRAINT "StockQty_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StockQty_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StockQty_id_seq";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "changedPassword" BOOLEAN NOT NULL,
    "isTwoFactorActive" BOOLEAN NOT NULL,

    CONSTRAINT "CustomerUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesOrder" (
    "id" TEXT NOT NULL,
    "salesOrderNumber" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "salesIncVat" DOUBLE PRECISION NOT NULL,
    "salesExcVat" DOUBLE PRECISION NOT NULL,
    "expectedCost" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "salesCurrency" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "invoiced" BOOLEAN NOT NULL DEFAULT false,
    "invoiceId" TEXT,

    CONSTRAINT "SalesOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sales" DOUBLE PRECISION NOT NULL,
    "expedtedCost" DOUBLE PRECISION NOT NULL,
    "costIncVat" DOUBLE PRECISION NOT NULL,
    "stocking" TEXT NOT NULL,
    "job" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "startDatePOs" TIMESTAMP(3) NOT NULL,
    "endDatePOs" TIMESTAMP(3) NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingInformation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "defaultCurrency" TEXT NOT NULL,

    CONSTRAINT "BillingInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivationKeys" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "stockQtyId" TEXT NOT NULL,
    "pendingStocks" INTEGER NOT NULL,
    "processingStocks" BOOLEAN NOT NULL,
    "totalKey" INTEGER NOT NULL,
    "customerUserId" TEXT NOT NULL,

    CONSTRAINT "ActivationKeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "salesOrderId" TEXT NOT NULL,
    "customerUserId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3) NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "sent" BOOLEAN NOT NULL,
    "A" BOOLEAN NOT NULL,
    "C" BOOLEAN NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BestSeller" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "soldCount" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BestSeller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerSalesReport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "yesterday" DOUBLE PRECISION NOT NULL,
    "today" DOUBLE PRECISION NOT NULL,
    "lastMonth" DOUBLE PRECISION NOT NULL,
    "thisMonth" DOUBLE PRECISION NOT NULL,
    "lastYear" DOUBLE PRECISION NOT NULL,
    "allTime" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CustomerSalesReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderPurchaseReport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thisWeekIncPending" DOUBLE PRECISION NOT NULL,
    "nextWeekPending" DOUBLE PRECISION NOT NULL,
    "yesterday" DOUBLE PRECISION NOT NULL,
    "todayIncPending" DOUBLE PRECISION NOT NULL,
    "lastMonth" DOUBLE PRECISION NOT NULL,
    "thisMonthIncPending" DOUBLE PRECISION NOT NULL,
    "lastYear" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProviderPurchaseReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderMonthlySalesReport" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "nintendo" DOUBLE PRECISION NOT NULL,
    "nexway" DOUBLE PRECISION NOT NULL,
    "epay" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProviderMonthlySalesReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyPurchased" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "nintendo" DOUBLE PRECISION NOT NULL,
    "nexway" DOUBLE PRECISION NOT NULL,
    "epay" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MonthlyPurchased_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SalesOrder_salesOrderNumber_key" ON "SalesOrder"("salesOrderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- AddForeignKey
ALTER TABLE "CustomerUser" ADD CONSTRAINT "CustomerUser_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockQty" ADD CONSTRAINT "StockQty_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationKeys" ADD CONSTRAINT "ActivationKeys_stockQtyId_fkey" FOREIGN KEY ("stockQtyId") REFERENCES "StockQty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationKeys" ADD CONSTRAINT "ActivationKeys_customerUserId_fkey" FOREIGN KEY ("customerUserId") REFERENCES "CustomerUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_customerUserId_fkey" FOREIGN KEY ("customerUserId") REFERENCES "CustomerUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

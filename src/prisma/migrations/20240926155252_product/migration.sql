-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "availableKeysInStock" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "availabilityStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockQty" (
    "id" SERIAL NOT NULL,
    "generatedKeys" INTEGER NOT NULL,
    "pendingKeysToGenerate" INTEGER NOT NULL,
    "soldKeys" INTEGER NOT NULL,
    "soldKeysPendingGeneration" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "StockQty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" SERIAL NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "promoPercent" DOUBLE PRECISION NOT NULL,
    "srpPriceWithVAT" DOUBLE PRECISION NOT NULL,
    "srpPriceWithoutVAT" DOUBLE PRECISION NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_SKU_key" ON "Product"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "StockQty_productId_key" ON "StockQty"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Pricing_productId_key" ON "Pricing"("productId");

-- AddForeignKey
ALTER TABLE "StockQty" ADD CONSTRAINT "StockQty_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

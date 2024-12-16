-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER[],
    "price" DOUBLE PRECISION NOT NULL,
    "provider" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "promotionStart" TIMESTAMP(3),
    "promotionEnd" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockQty" (
    "id" TEXT NOT NULL,
    "generatedKeys" INTEGER NOT NULL,
    "pendingKeysToGenerate" INTEGER NOT NULL,
    "soldKeys" INTEGER NOT NULL,
    "soldKeysPendingGeneration" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "StockQty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "promoPercent" DOUBLE PRECISION NOT NULL,
    "srpPriceWithVAT" DOUBLE PRECISION NOT NULL,
    "srpPriceWithoutVAT" DOUBLE PRECISION NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesOrder" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "salesVat" DOUBLE PRECISION NOT NULL,
    "salesIncVat" DOUBLE PRECISION NOT NULL,
    "salesExtVat" DOUBLE PRECISION NOT NULL,
    "expectedCost" DOUBLE PRECISION NOT NULL,
    "avgCost" DOUBLE PRECISION NOT NULL,
    "processQuantity" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "salesCurrency" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "N_A" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalesOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "costIncVat" DOUBLE PRECISION NOT NULL,
    "costExtVat" DOUBLE PRECISION NOT NULL,
    "processQuantity" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "job" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salesOrderId" TEXT,

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
    "state" TEXT NOT NULL,
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
    "fs_id" TEXT,
    "change_date" TIMESTAMP(3),
    "url" TEXT,
    "type" TEXT,
    "dates_released_dts" TIMESTAMP(3)[],
    "club_nintendo" BOOLEAN,
    "pretty_date_s" TEXT,
    "play_mode_tv_mode_b" BOOLEAN,
    "play_mode_handheld_mode_b" BOOLEAN,
    "product_code_txt" TEXT[],
    "image_url_sq_s" TEXT,
    "deprioritise_b" BOOLEAN,
    "demo_availability" BOOLEAN,
    "pg_s" TEXT,
    "compatible_controller" TEXT[],
    "originally_for_t" TEXT,
    "paid_subscription_required_b" BOOLEAN,
    "cloud_saves_b" BOOLEAN,
    "priority" TIMESTAMP(3),
    "digital_version_b" BOOLEAN,
    "title_extras_txt" TEXT[],
    "image_url_h2x1_s" TEXT,
    "system_type" TEXT[],
    "age_rating_sorting_i" INTEGER,
    "game_categories_txt" TEXT[],
    "play_mode_tabletop_mode_b" BOOLEAN,
    "publisher" TEXT NOT NULL,
    "product_code_ss" TEXT[],
    "excerpt" TEXT NOT NULL,
    "nsuid_txt" TEXT[],
    "date_from" TIMESTAMP(3) NOT NULL,
    "language_availability" TEXT[],
    "price_has_discount_b" BOOLEAN,
    "product_catalog_description_s" TEXT,
    "related_nsuids_txt" TEXT[],
    "price_discount_percentage_f" INTEGER,
    "title" TEXT,
    "sorting_title" TEXT,
    "wishlist_email_square_image_url_s" TEXT,
    "players_to" INTEGER,
    "wishlist_email_banner640w_image_url_s" TEXT,
    "paid_subscription_online_play_b" BOOLEAN,
    "playable_on_txt" TEXT[],
    "hits_i" INTEGER,
    "pretty_game_categories_txt" TEXT[],
    "title_master_s" TEXT,
    "switch_game_voucher_b" BOOLEAN,
    "game_category" TEXT[],
    "system_names_txt" TEXT[],
    "pretty_agerating_s" TEXT,
    "price_regular_f" DOUBLE PRECISION,
    "eshop_removed_b" BOOLEAN,
    "age_rating_type" TEXT,
    "price_sorting_f" DOUBLE PRECISION,
    "price_lowest_f" DOUBLE PRECISION,
    "age_rating_value" TEXT,
    "physical_version_b" BOOLEAN,
    "wishlist_email_banner460w_image_url_s" TEXT,
    "downloads_rank_i" INTEGER,
    "version" TEXT,
    "region" TEXT NOT NULL,

    CONSTRAINT "NintendoData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "storeID" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "transactionID" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fulfillment" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "Fulfillment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Code" (
    "id" SERIAL NOT NULL,
    "controlNumber" TEXT NOT NULL,
    "downloadNumber" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "fulfillmentId" INTEGER NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EpayData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sku" TEXT NOT NULL,

    CONSTRAINT "EpayData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "StockQty_productId_key" ON "StockQty"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Pricing_productId_key" ON "Pricing"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "NintendoData_fs_id_key" ON "NintendoData"("fs_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_storeID_key" ON "Store"("storeID");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionID_key" ON "Transaction"("transactionID");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "StockQty" ADD CONSTRAINT "StockQty_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivationKeys" ADD CONSTRAINT "ActivationKeys_stockQtyId_fkey" FOREIGN KEY ("stockQtyId") REFERENCES "StockQty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APILog" ADD CONSTRAINT "APILog_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CRMData" ADD CONSTRAINT "CRMData_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fulfillment" ADD CONSTRAINT "Fulfillment_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_fulfillmentId_fkey" FOREIGN KEY ("fulfillmentId") REFERENCES "Fulfillment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

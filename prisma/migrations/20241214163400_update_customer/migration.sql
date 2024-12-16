/*
  Warnings:

  - You are about to drop the column `ip` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `address` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyInvoice` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCode` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultVatRate` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facebook` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedIn` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryEmail` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryFacebook` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryLinkedIn` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryPhone` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primarySkype` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primarySurname` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryTwitter` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesCurrency` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesRegion` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skype` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxInformation` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitter` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "ip",
DROP COLUMN "region",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "companyInvoice" TEXT NOT NULL,
ADD COLUMN     "countryCode" TEXT NOT NULL,
ADD COLUMN     "defaultVatRate" TEXT NOT NULL,
ADD COLUMN     "facebook" TEXT NOT NULL,
ADD COLUMN     "linkedIn" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "primaryEmail" TEXT NOT NULL,
ADD COLUMN     "primaryFacebook" TEXT NOT NULL,
ADD COLUMN     "primaryLinkedIn" TEXT NOT NULL,
ADD COLUMN     "primaryName" TEXT NOT NULL,
ADD COLUMN     "primaryPhone" TEXT NOT NULL,
ADD COLUMN     "primarySkype" TEXT NOT NULL,
ADD COLUMN     "primarySurname" TEXT NOT NULL,
ADD COLUMN     "primaryTwitter" TEXT NOT NULL,
ADD COLUMN     "salesCurrency" TEXT NOT NULL,
ADD COLUMN     "salesRegion" TEXT NOT NULL,
ADD COLUMN     "skype" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL,
ADD COLUMN     "taxInformation" TEXT NOT NULL,
ADD COLUMN     "twitter" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

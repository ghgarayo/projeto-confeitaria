/*
  Warnings:

  - You are about to drop the column `customer_categoryid` on the `customers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_customer_categoryid_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "customer_categoryid",
ADD COLUMN     "customer_category_id" TEXT;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_customer_category_id_fkey" FOREIGN KEY ("customer_category_id") REFERENCES "customers_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

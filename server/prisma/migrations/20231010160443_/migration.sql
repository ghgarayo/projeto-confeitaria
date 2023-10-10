/*
  Warnings:

  - You are about to drop the `logins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "logins" DROP CONSTRAINT "logins_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "logins" DROP CONSTRAINT "logins_employee_id_fkey";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "customer_categoryid" TEXT;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "employee_role_id" TEXT;

-- DropTable
DROP TABLE "logins";

-- CreateTable
CREATE TABLE "customers_categories" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees_roles" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_customer_categoryid_fkey" FOREIGN KEY ("customer_categoryid") REFERENCES "customers_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_employee_role_id_fkey" FOREIGN KEY ("employee_role_id") REFERENCES "employees_roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

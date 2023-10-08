/*
  Warnings:

  - You are about to drop the `logins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "logins" DROP CONSTRAINT "logins_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "logins" DROP CONSTRAINT "logins_employee_id_fkey";

-- DropTable
DROP TABLE "logins";

-- CreateTable
CREATE TABLE "customers_logins" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_logins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees_logins" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employees_logins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customers_logins" ADD CONSTRAINT "customers_logins_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees_logins" ADD CONSTRAINT "employees_logins_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "number" TEXT;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

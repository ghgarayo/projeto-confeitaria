-- CreateTable
CREATE TABLE "logins" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "logins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logins" ADD CONSTRAINT "logins_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

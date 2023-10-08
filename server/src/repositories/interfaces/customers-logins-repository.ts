import { Prisma, LoginCustomer } from '@prisma/client'

export interface CustomersLoginsRepository {
  create(data: Prisma.LoginCustomerUncheckedCreateInput): Promise<LoginCustomer>
  findByCustomerId(customerId: string): Promise<LoginCustomer | null>
}

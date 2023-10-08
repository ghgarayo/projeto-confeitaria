import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { CustomersLoginsRepository } from '../interfaces/customers-logins-repository'

export class PrismaCustomersLoginsRepository
  implements CustomersLoginsRepository
{
  async create(data: Prisma.LoginCustomerUncheckedCreateInput) {
    const login = await prisma.loginCustomer.create({ data })

    return login
  }

  async findByCustomerId(customerId: string) {
    const login = await prisma.loginCustomer.findFirst({
      where: {
        customer_id: customerId,
      },
    })

    if (!login) {
      return null
    }

    return login
  }
}

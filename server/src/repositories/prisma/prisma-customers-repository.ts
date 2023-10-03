import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CustomersRepository } from '@/repositories/interfaces/customers-repository'

export class PrismaCustomersRepository implements CustomersRepository {
  async create(data: Prisma.CustomerCreateInput) {
    const customer = await prisma.customer.create({
      data,
    })

    return customer
  }

  async findByEmail(email: string) {
    const customer =
      email !== undefined
        ? await prisma.customer.findUnique({
            where: { email },
          })
        : null

    return customer
  }
}

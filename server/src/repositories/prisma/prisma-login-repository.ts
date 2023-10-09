import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { LoginsRepository } from '../interfaces/logins-repository'

export class PrismaLoginsRepository implements LoginsRepository {
  async create(data: Prisma.LoginUncheckedCreateInput) {
    const login = await prisma.login.create({ data })

    return login
  }

  async findByCustomerId(customerId: string) {
    const login = await prisma.login.findFirst({
      where: {
        customer_id: customerId,
      },
    })

    if (!login) {
      return null
    }

    return login
  }

  async findByEmployeeId(employeeId: string) {
    const login = await prisma.login.findFirst({
      where: {
        employee_id: employeeId,
      },
    })

    if (!login) {
      return null
    }

    return login
  }
}

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { EmployeesLoginRepository } from '../interfaces/employees-logins-repository'

export class PrismaEmployeesLoginRepository
  implements EmployeesLoginRepository
{
  async create(data: Prisma.LoginEmployeeUncheckedCreateInput) {
    const login = await prisma.loginEmployee.create({ data })

    return login
  }

  async findByEmployeeId(employeeId: string) {
    const login = await prisma.loginEmployee.findFirst({
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

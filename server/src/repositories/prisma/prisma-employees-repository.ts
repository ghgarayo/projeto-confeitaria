import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { EmployeesRepository } from '../interfaces/employees-repository'

export class PrismaEmployeesRepository implements EmployeesRepository {
  async create(data: Prisma.EmployeeUncheckedCreateInput) {
    const employee = await prisma.employee.create({
      data,
    })
    return employee
  }

  async findByEmail(email: string) {
    const employee = await prisma.employee.findFirst({
      where: { email },
    })

    return employee
  }

  async findByCtps(ctps: string) {
    const employee = await prisma.employee.findFirst({
      where: { ctps },
    })

    return employee
  }

  async findByCpf(cpf: string) {
    const employee = await prisma.employee.findFirst({
      where: { cpf },
    })

    return employee
  }

  async findById(id: string) {
    const employee = await prisma.employee.findUnique({
      where: { id },
    })

    return employee
  }
}

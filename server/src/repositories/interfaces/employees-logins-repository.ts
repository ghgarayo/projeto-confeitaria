import { Prisma, LoginEmployee } from '@prisma/client'

export interface EmployeesLoginRepository {
  create(data: Prisma.LoginEmployeeUncheckedCreateInput): Promise<LoginEmployee>
  findByEmployeeId(employee: string): Promise<LoginEmployee | null>
}

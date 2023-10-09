import { Prisma, Login } from '@prisma/client'

export interface LoginsRepository {
  create(data: Prisma.LoginUncheckedCreateInput): Promise<Login>
  findByCustomerId(customerId: string): Promise<Login | null>
  findByEmployeeId(employeeId: string): Promise<Login | null>
}

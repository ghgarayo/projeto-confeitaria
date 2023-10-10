import { Prisma, Employee } from '@prisma/client'

export interface EmployeesRepository {
  create(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee>
  findByCpf(cpf: string): Promise<Employee | null>
  findByEmail(email: string): Promise<Employee | null>
  findById(id: string): Promise<Employee | null>
  findByCtps(ctps: string): Promise<Employee | null>
}

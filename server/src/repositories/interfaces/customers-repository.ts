import { Prisma, Customer } from '@prisma/client'

export interface CustomersRepository {
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
  findByCpf(cpf: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  findById(customerId: string): Promise<Customer | null>
}

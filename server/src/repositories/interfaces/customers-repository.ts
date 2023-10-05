import { Prisma, Customer } from '@prisma/client'

export interface CustomersRepository {
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
  findByEmail(email: string): Promise<Customer | null>
  findByCpf(cpf: string): Promise<Customer | null>
}

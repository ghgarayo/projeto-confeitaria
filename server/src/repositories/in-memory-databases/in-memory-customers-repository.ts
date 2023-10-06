import { Customer, Prisma } from '@prisma/client'
import { CustomersRepository } from '../interfaces/customers-repository'

/*

  REPOSITORIO DE TESTE

*/

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[] = []

  async create(data: Prisma.CustomerCreateInput) {
    const customer = {
      id: 'user-1',
      name: data.name,
      cpf: data.cpf,
      date_of_birth: data.date_of_birth ?? null,
      email: data.email ?? null,
      password_hash: data.password_hash ?? null,
      phone: data.phone ?? null,
      is_active: data.is_active ?? true,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.customers.push(customer)

    return customer
  }

  async findById(customerId: string) {
    const customer = this.customers.find(
      (customer) => customer.id === customerId,
    )

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail(email: string) {
    const customer = this.customers.find((customer) => customer.email === email)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByCpf(cpf: string) {
    const customer = this.customers.find((customer) => customer.cpf === cpf)

    if (!customer) {
      return null
    }

    return customer
  }
}

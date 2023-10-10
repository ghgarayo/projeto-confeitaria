import { Customer, Prisma } from '@prisma/client'
import { CustomersRepository } from '../interfaces/customers-repository'
import { randomUUID } from 'node:crypto'
/*

  REPOSITORIO DE TESTE

*/

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[] = []

  async create(data: Prisma.CustomerUncheckedCreateInput) {
    const customer = {
      id: randomUUID(),
      name: data.name,
      cpf: data.cpf,
      date_of_birth: data.date_of_birth ?? null,
      email: data.email ?? null,
      password_hash: data.password_hash ?? null,
      phone: data.phone ?? null,
      customer_category_id: data.customer_category_id ?? null,
      is_active: data.is_active ?? true,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.customers.push(customer)

    return customer
  }

  async findById(customerId: string) {
    return this.customers.find((customer) => customer.id === customerId) || null
  }

  async findByEmail(email: string) {
    return this.customers.find((customer) => customer.email === email) || null
  }

  async findByCpf(cpf: string) {
    return this.customers.find((customer) => customer.cpf === cpf) || null
  }

  async update(data: Prisma.CustomerCreateInput) {
    const customer = this.customers.find((customer) => customer.id === data.id)

    if (!customer) return null

    customer.name = data.name ?? customer.name
    customer.cpf = data.cpf ?? customer.cpf
    customer.date_of_birth = data.date_of_birth ?? customer.date_of_birth
    customer.email = data.email ?? customer.email
    customer.password_hash = data.password_hash ?? customer.password_hash
    customer.phone = data.phone ?? customer.phone
    customer.is_active = data.is_active ?? customer.is_active
    customer.updated_at = new Date()

    return customer
  }

  async fetchList(): Promise<Customer[]> {
    return this.customers
  }

  async inactivateUser(customerId: string): Promise<void> {
    const customer = this.customers.find(
      (customer) => customer.id === customerId,
    )

    if (!customer) return

    customer.is_active = false
    customer.updated_at = new Date()
  }
}

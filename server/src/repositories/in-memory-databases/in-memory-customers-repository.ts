import { Customer, Prisma } from '@prisma/client'
import { CustomersRepository } from '../interfaces/customers-repository'
import { randomUUID } from 'node:crypto'
/*

  REPOSITORIO DE TESTE

*/

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[] = []

  async create(data: Prisma.CustomerCreateInput) {
    const customer = {
      id: randomUUID(),
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
    return Promise.resolve(this.customers)
  }
}

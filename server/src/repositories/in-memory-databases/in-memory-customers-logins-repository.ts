import { LoginCustomer, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CustomersLoginsRepository } from '../interfaces/customers-logins-repository'

/*

  REPOSITORIO DE TESTE

*/

export class InMemoryCustomersLoginRepository
  implements CustomersLoginsRepository
{
  public logins: LoginCustomer[] = []

  async create(data: Prisma.LoginCustomerUncheckedCreateInput) {
    const login = {
      id: randomUUID(),
      customer_id: data.customer_id,
      created_at: new Date(),
    }

    this.logins.push(login)

    return login
  }

  async findByCustomerId(customerId: string) {
    const login = this.logins.find((login) => login.customer_id === customerId)

    if (!login) {
      return null
    }

    return login
  }
}

import { Login, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { LoginsRepository } from '../interfaces/logins-repository'

/*

  REPOSITORIO DE TESTE

*/

export class InMemoryLoginRepository implements LoginsRepository {
  public logins: Login[] = []

  async create(data: Prisma.LoginUncheckedCreateInput) {
    const login = {
      id: randomUUID(),
      customer_id: data.customer_id ?? null,
      employee_id: data.employee_id ?? null,
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

  async findByEmployeeId(customerId: string) {
    const login = this.logins.find((login) => login.employee_id === customerId)

    if (!login) {
      return null
    }

    return login
  }
}

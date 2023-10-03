import { Prisma } from '@prisma/client'

/*

  REPOSITORIO DE TESTE

*/

export class InMemoryCustomersRepository {
  public customers: any = []

  async create(data: Prisma.CustomerCreateInput) {
    this.customers.push(data)
  }
}

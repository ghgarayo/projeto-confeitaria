import { Address, Prisma } from '@prisma/client'
import { AddressesRepository } from '../interfaces/address-repository'
import { randomUUID } from 'node:crypto'

/*

  REPOSITORIO DE TESTE

*/

export class InMemoryAddressesRepository implements AddressesRepository {
  private addresses: Address[] = []

  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = {
      id: randomUUID(),
      description: data.description ?? null,
      street: data.street,
      number: data.number ?? null,
      complement: data.complement ?? null,
      neighborhood: data.neighborhood,
      cep: data.cep,
      city: data.city,
      state: data.state,
      customer_id: data.customer_id,
      is_active: data.is_active ?? true,
      updated_at: new Date(),
    }

    this.addresses.push(address)

    return address
  }
}

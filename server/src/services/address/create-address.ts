import { AddressesRepository } from '@/repositories/interfaces/address-repository'
import { CustomersRepository } from '@/repositories/interfaces/customers-repository'
import { Address } from '@prisma/client'

import { CustomerNotFoundError } from '../errors/customer-not-found-error'

interface AddressServiceRequest {
  description?: string
  street: string
  number?: string
  complement?: string
  neighborhood: string
  cep: string
  city: string
  state: string
  customerId: string
}

interface AddressServiceResponse {
  address: Address
}

export class CreateAddressService {
  constructor(
    private addressesRepository: AddressesRepository,
    private customersRepository: CustomersRepository,
  ) {}

  async handle({
    description,
    street,
    number,
    complement,
    neighborhood,
    cep,
    city,
    state,
    customerId,
  }: AddressServiceRequest): Promise<AddressServiceResponse> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) throw new CustomerNotFoundError()

    const address = await this.addressesRepository.create({
      description,
      street,
      number,
      complement,
      neighborhood,
      cep,
      city,
      state,
      customer_id: customer.id,
    })

    return { address }
  }
}

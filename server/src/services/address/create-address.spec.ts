import { InMemoryAddressesRepository } from '@/repositories/in-memory-databases/in-memory-addresses-repository'
import { InMemoryCustomersRepository } from '@/repositories/in-memory-databases/in-memory-customers-repository'

import { CreateAddressService } from './create-address'

import { beforeEach, expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { CustomerNotFoundError } from '../errors/customer-not-found-error'

let addressesRespository: InMemoryAddressesRepository
let customersRepository: InMemoryCustomersRepository
let sut: CreateAddressService

describe('Create Address Service', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    addressesRespository = new InMemoryAddressesRepository()
    sut = new CreateAddressService(addressesRespository, customersRepository)
  })

  it('should be able to create an address for a customer', async () => {
    const customer = await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 8),
      cpf: '00000000000',
      phone: '00000000000',
    })

    const { address } = await sut.handle({
      customerId: customer.id,
      street: 'street',
      number: 'number',
      complement: 'complement',
      neighborhood: 'neighborhood',
      city: 'city',
      state: 'state',
      cep: 'zipcode',
    })

    expect(address.id).toEqual(expect.any(String))
  })

  it('should be able to create an address for a customer with wrong ID', async () => {
    await expect(() =>
      sut.handle({
        customerId: 'wrong-id',
        street: 'street',
        number: 'number',
        complement: 'complement',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
        cep: 'zipcode',
      }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError)
  })

  // TODO: Testar o cadastro de multiplos endereços para um mesmo cliente
})

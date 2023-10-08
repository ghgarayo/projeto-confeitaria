import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryCustomersRepository } from '@/repositories/in-memory-databases/in-memory-customers-repository'
import { GetUserProfileService } from './get-user-profile'
import { CustomerNotFoundError } from '../errors/customer-not-found-error'

let customerRepository: InMemoryCustomersRepository
let sut: GetUserProfileService

describe('Get User Service', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomersRepository()
    sut = new GetUserProfileService(customerRepository)
  })

  it('should be able to retrive an user profile', async () => {
    const customerOnDB = await customerRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 8),
      cpf: '00000000000',
      phone: '00000000000',
    })

    const { customer } = await sut.handle({
      customerId: customerOnDB.id,
    })

    expect(customer.id).toEqual(expect.any(String))
    expect(customer.name).toEqual('John Doe')
  })

  it('should be able to retrieve an user profile with an wrong ID', async () => {
    expect(() =>
      sut.handle({
        customerId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError)
  })
})

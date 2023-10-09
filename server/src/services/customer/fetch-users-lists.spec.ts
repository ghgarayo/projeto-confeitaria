import { InMemoryCustomersRepository } from '@/repositories/in-memory-databases/in-memory-customers-repository'
import { beforeEach, expect, describe, it } from 'vitest'
import { FetchCustomersListService } from './fetch-users-lists'
import { hash } from 'bcryptjs'

let customersRepository: InMemoryCustomersRepository
let sut: FetchCustomersListService

describe('Fetch Customers List Service', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new FetchCustomersListService(customersRepository)
  })

  it('should be able to fetch customers list', async () => {
    await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 8),
      cpf: '12345678912',
      phone: '00000000000',
    })

    await customersRepository.create({
      name: 'John Does',
      email: 'johndoes@email.com',
      password_hash: await hash('123456', 8),
      cpf: '13365349766',
      phone: '00000000000',
    })

    const { customers } = await sut.handle()

    expect(customers.length).toBeGreaterThan(1)
  })

  it('should not be able to fetch customers list if list is empty', async () => {
    const { customers } = await sut.handle()

    expect(customers.length).toBe(0)
  })
})

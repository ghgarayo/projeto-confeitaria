import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InactivateService } from './inactivate-user'
import { InMemoryCustomersRepository } from '@/repositories/in-memory-databases/in-memory-customers-repository'
import { CustomerNotFoundError } from '../errors/customer-not-found-error'

let customersRepository: InMemoryCustomersRepository
let sut: InactivateService

describe('Customer Update Service', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new InactivateService(customersRepository)
  })

  it('should be able to inactivate a customer', async () => {
    const customerToBeSavedOnDB = await customersRepository.create({
      name: 'John Doe',
      cpf: '12312313142',
      date_of_birth: '1999-01-01',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 8),
      phone: '41999999999',
      is_active: true,
    })

    console.log(customerToBeSavedOnDB)

    await sut.handle({ customer_id: customerToBeSavedOnDB.id })

    const updatedCustomer = await customersRepository.findById(
      customerToBeSavedOnDB.id,
    )

    console.log(updatedCustomer)

    expect(updatedCustomer?.is_active).toEqual(false)
  })

  it('should not inactivate a customer if ID is wrong', async () => {
    await expect(() =>
      sut.handle({ customer_id: 'wrong-id' }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError)
  })
})

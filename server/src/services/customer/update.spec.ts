import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UpdateService } from './update'

import { InMemoryCustomersRepository } from '@/repositories/in-memory-databases/in-memory-customers-repository'

let customersRepository: InMemoryCustomersRepository
let sut: UpdateService

describe('Customer Update Service', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new UpdateService(customersRepository)
  })

  it('should be able to update a customer', async () => {
    const customerToBeSavedOnDB = await customersRepository.create({
      name: 'John Doe',
      cpf: '12312313142',
      date_of_birth: '1999-01-01',
      email: 'johndoe@email.com',
      password_hash: '123456',
      phone: '41999999999',
      is_active: true,
    })

    console.log(customerToBeSavedOnDB)

    await sut.handle({
      id: customerToBeSavedOnDB.id,
      name: 'John Doe Doe',
      cpf: '12312313132',
      date_of_birth: '1996-01-01',
      email: 'johndoes@example.com',
      password: '123326',
      phone: '41999993999',
    })

    const updatedCustomer = await customersRepository.findById(
      customerToBeSavedOnDB.id,
    )

    console.log(updatedCustomer)

    expect(updatedCustomer?.name).toEqual('John Doe Doe')
  })

  it('should not update the field if empty', async () => {
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

    await sut.handle({
      id: customerToBeSavedOnDB.id,
      name: '',
      cpf: '',
      date_of_birth: '',
      email: '',
      password: '',
      phone: '',
    })

    const updatedCustomer = await customersRepository.findById(
      customerToBeSavedOnDB.id,
    )

    console.log(updatedCustomer)

    expect(updatedCustomer).toEqual(customerToBeSavedOnDB)
  })
})

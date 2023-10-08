import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterService } from './register'

import { InMemoryCustomersRepository } from '@/repositories/in-memory-databases/in-memory-customers-repository'

import { CustomerEmailAlreadyRegisteredError } from '../errors/customer-email-already-registered-error'
import { CustomerCpfAlreadyRegisteredError } from '../errors/customer-cpf-already-registered-error'

let customerRepository: InMemoryCustomersRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomersRepository()
    sut = new RegisterService(customerRepository)
  })
  it('should be able to register', async () => {
    const customerRepository = new InMemoryCustomersRepository()

    // Subject Under Test(SUT) => convenção para nomear a classe que está sendo testada
    const sut = new RegisterService(customerRepository)

    const { customer } = await sut.handle({
      name: 'John Doe',
      cpf: '12312313142',
      date_of_birth: '1999-01-01',
      email: 'johndoes@email.com',
      password: '123456',
      phone: '41999999999',
    })

    expect(customer.id).toEqual(expect.any(String))
  })

  it('should hash the password upon customer registration', async () => {
    const { customer } = await sut.handle({
      name: 'John Doe',
      cpf: '12312313142',
      date_of_birth: '1999-01-01',
      email: 'johndoes@email.com',
      password: '123456',
      phone: '41999999999',
    })

    const hashedPassword = customer.password_hash

    const isPasswordCorrectlyHashed = hashedPassword
      ? await compare('123456', hashedPassword)
      : false

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not allow a duplicated email to be registered', async () => {
    const email = 'johndoe@email.com'

    await sut.handle({
      name: 'John Doe',
      cpf: '12312313142',
      date_of_birth: '1999-01-01',
      email,
      password: '123456',
      phone: '41999999999',
    })

    await expect(() =>
      sut.handle({
        name: 'John Doe',
        cpf: '12312313342',
        date_of_birth: '1999-01-01',
        email,
        password: '123456',
        phone: '41999999999',
      }),
    ).rejects.toBeInstanceOf(CustomerEmailAlreadyRegisteredError)
  })

  // TODO implementar teste de CPF Válido

  it('should not allow a duplicated cpf to be registered', async () => {
    const cpf = '12312313142'

    await sut.handle({
      name: 'John Doe',
      cpf,
      phone: '41999999999',
    })

    await expect(() =>
      sut.handle({
        name: 'John Doe',
        cpf,
        phone: '41999999999',
      }),
    ).rejects.toBeInstanceOf(CustomerCpfAlreadyRegisteredError)
  })
})

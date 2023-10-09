import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterService } from './register'

import { InMemoryCustomersRepository } from '@/repositories/in-memory-databases/in-memory-customers-repository'

import { EmailAlreadyRegisteredError } from '../errors/email-already-registered-error'
import { CpfAlreadyRegisteredError } from '../errors/cpf-already-registered-error'
import { InvalidCpfError } from '../errors/invalid-cpf-error'

let customerRepository: InMemoryCustomersRepository
let sut: RegisterService

describe('Customer Register Service', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomersRepository()
    // Subject Under Test(SUT) => convenção para nomear a classe que está sendo testada
    sut = new RegisterService(customerRepository)
  })
  it('should be able to register', async () => {
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

    const isPasswordCorrectlyHashed = customer.password_hash
      ? await compare('123456', customer.password_hash)
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
    ).rejects.toBeInstanceOf(EmailAlreadyRegisteredError)
  })

  it('should now allow an invalid cpf to be registered', async () => {
    await expect(() =>
      sut.handle({
        name: 'John Doe',
        cpf: '99999999999',
        date_of_birth: '1999-01-01',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '41999999999',
      }),
    ).rejects.toBeInstanceOf(InvalidCpfError)
  })

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
    ).rejects.toBeInstanceOf(CpfAlreadyRegisteredError)
  })
})

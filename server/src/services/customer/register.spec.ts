import { expect, describe, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryCustomersRepository } from '@/repositories/in-memory-databases/in-memory-customers-repository'
import { CustomerEmailAlreadyRegisteredError } from '../errors/customer-email-already-registered-error'
import { CustomerCpfAlreadyRegisteredError } from '../errors/customer-cpf-already-registered-error'

/*
 * IN MEMORY DATABASE MOCK
 */

describe('Register Service', () => {
  it('should be able to register', async () => {
    const customerRepository = new InMemoryCustomersRepository()
    const registerService = new RegisterService(customerRepository)

    const { customer } = await registerService.handle({
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
    const customerRepository = new InMemoryCustomersRepository()
    const registerService = new RegisterService(customerRepository)

    const { customer } = await registerService.handle({
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
    const customerRepository = new InMemoryCustomersRepository()
    const registerService = new RegisterService(customerRepository)

    const email = 'johndoe@email.com'

    await registerService.handle({
      name: 'John Doe',
      cpf: '12312313142',
      date_of_birth: '1999-01-01',
      email,
      password: '123456',
      phone: '41999999999',
    })

    await expect(() =>
      registerService.handle({
        name: 'John Doe',
        cpf: '12312313342',
        date_of_birth: '1999-01-01',
        email,
        password: '123456',
        phone: '41999999999',
      }),
    ).rejects.toBeInstanceOf(CustomerEmailAlreadyRegisteredError)
  })

  it('should not allow a duplicated cpf to be registered', async () => {
    // TODO : implementar teste de CPF Válido

    const customerRepository = new InMemoryCustomersRepository()
    const registerService = new RegisterService(customerRepository)

    const cpf = '12312313142'

    await registerService.handle({
      name: 'John Doe',
      cpf,
      phone: '41999999999',
    })

    await expect(() =>
      registerService.handle({
        name: 'John Doe',
        cpf,
        phone: '41999999999',
      }),
    ).rejects.toBeInstanceOf(CustomerCpfAlreadyRegisteredError)
  })
})

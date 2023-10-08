import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { AuthenticateService } from './authenticate'

import { InMemoryCustomersRepository } from '@/repositories/in-memory-databases/in-memory-customers-repository'
import { InMemoryCustomersLoginRepository } from '@/repositories/in-memory-databases/in-memory-customers-logins-repository'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let customersRepository: InMemoryCustomersRepository
let customersLoginsRepository: InMemoryCustomersLoginRepository

let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()

    sut = new AuthenticateService(
      customersLoginsRepository,
      customersRepository,
    )
  })

  it.skip('should be able to authenticate', async () => {
    // TODO: corrigir este teste
    await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 8),
      cpf: '00000000000',
      phone: '00000000000',
    })

    const isAuthenticated = await sut.handle({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(isAuthenticated).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with a wrong email', async () => {
    await expect(() =>
      sut.handle({
        email: 'johndoes@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 8),
      cpf: '00000000000',
      phone: '00000000000',
    })

    await expect(() =>
      sut.handle({
        email: 'johndoe@email.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

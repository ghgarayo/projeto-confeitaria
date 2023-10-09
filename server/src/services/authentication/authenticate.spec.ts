import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { AuthenticateService } from './authenticate'

import { InMemoryCustomersRepository } from '@/repositories/in-memory-databases/in-memory-customers-repository'
import { InMemoryCustomersLoginRepository } from '@/repositories/in-memory-databases/in-memory-customers-logins-repository'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory-databases/in-memory-employees-repository'
import { InMemoryEmployeesLoginRepository } from '@/repositories/in-memory-databases/in-memory-employees-logins-repository'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let customersRepository: InMemoryCustomersRepository
let customersLoginsRepository: InMemoryCustomersLoginRepository

let employeesRepository: InMemoryEmployeesRepository
let employeesLoginRepository: InMemoryEmployeesLoginRepository

let sut: AuthenticateService

describe('Customer Authentication Service', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()

    sut = new AuthenticateService(
      customersLoginsRepository,
      customersRepository,
    )
  })

  it('should be able to authenticate', async () => {
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

    expect(isAuthenticated.user.id).toEqual(expect.any(String))
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

describe('Employees Authentication Service', () => {
  beforeEach(() => {
    employeesLoginRepository = new InMemoryEmployeesLoginRepository()
    employeesRepository = new InMemoryEmployeesRepository()

    sut = new AuthenticateService(employeesLoginRepository, employeesRepository)
  })

  it('should be able to authenticate', async () => {
    await employeesRepository.create({
      name: 'John Doe',
      date_of_birth: '1999-01-01',
      cpf: '12312313142',
      ctps: '123456789',
      rg: '123456789',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 8),
      phone: '00000000000',
    })

    const isAuthenticated = await sut.handle({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(isAuthenticated.user.id).toEqual(expect.any(String))
  })
})

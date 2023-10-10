import { InMemoryEmployeesRepository } from '@/repositories/in-memory-databases/in-memory-employees-repository'
import { RegisterService } from './register'
import { beforeEach, describe, expect, it } from 'vitest'

let employeesRepository: InMemoryEmployeesRepository
let sut: RegisterService

describe('Employees Register Service', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new RegisterService(employeesRepository)
  })

  it('should be able to register', async () => {
    const { employee } = await sut.handle({
      name: 'Jane Doe',
      date_of_birth: '1999-01-01',
      cpf: '12312313142',
      rg: '123456789',
      ctps: '123456789',
      email: 'janedoe@example.com',
      password: '123456',
      phone: '41999999999',
    })

    console.log(employee)

    expect(employee.id).toEqual(expect.any(String))
  })
})

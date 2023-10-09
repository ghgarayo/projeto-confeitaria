import { LoginEmployee, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { EmployeesLoginRepository } from '../interfaces/employees-logins-repository'

/*

  REPOSITORIO DE TESTE

*/

export class InMemoryEmployeesLoginRepository
  implements EmployeesLoginRepository
{
  public logins: LoginEmployee[] = []

  async create(data: Prisma.LoginEmployeeUncheckedCreateInput) {
    const login = {
      id: randomUUID(),
      employee_id: data.employee_id,
      created_at: new Date(),
    }

    this.logins.push(login)

    return login
  }

  async findByEmployeeId(employeeId: string) {
    const login = this.logins.find((login) => login.employee_id === employeeId)

    if (!login) {
      return null
    }

    return login
  }
}

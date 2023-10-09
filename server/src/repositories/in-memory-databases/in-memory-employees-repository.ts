import { Employee, Prisma } from '@prisma/client'
import { EmployeesRepository } from '../interfaces/employees-repository'
import { randomUUID } from 'node:crypto'

/*

  REPOSITORIO DE TESTE

*/

export class InMemoryEmployeesRepository implements EmployeesRepository {
  public employees: Employee[] = []

  async create(data: Prisma.EmployeeCreateInput) {
    const employee = {
      id: randomUUID(),
      name: data.name,
      date_of_birth: data.date_of_birth ?? null,
      cpf: data.cpf,
      rg: data.rg ?? null,
      ctps: data.ctps,
      email: data.email ?? null,
      password_hash: data.password_hash ?? null,
      phone: data.phone ?? null,
      is_active: data.is_active ?? true,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.employees.push(employee)

    return employee
  }

  async findById(employeeId: string) {
    const employee = this.employees.find(
      (employee) => employee.id === employeeId,
    )

    if (!employee) {
      return null
    }

    return employee
  }

  async findByEmail(email: string) {
    const employee = this.employees.find((employee) => employee.email === email)

    if (!employee) {
      return null
    }

    return employee
  }

  async findByCpf(cpf: string) {
    const employee = this.employees.find((employee) => employee.cpf === cpf)

    if (!employee) {
      return null
    }

    return employee
  }

  async findByCtps(ctps: string) {
    const employee = this.employees.find((employee) => employee.ctps === ctps)

    if (!employee) {
      return null
    }

    return employee
  }
}

import { hash } from 'bcryptjs'

import { Employee } from '@prisma/client'
import { EmployeesRepository } from '@/repositories/interfaces/employees-repository'

import { EmailAlreadyRegisteredError } from '../errors/email-already-registered-error'
import { CpfAlreadyRegisteredError } from '../errors/cpf-already-registered-error'
import { CtpsAlreadyRegisteredError } from '../errors/ctps-already-registered-error'

interface RegisterServiceRequest {
  name: string
  date_of_birth: string
  cpf: string
  rg: string
  ctps: string
  email: string
  password: string
  phone?: string
}

interface RegisterServiceResponse {
  employee: Employee
}

export class RegisterService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async handle({
    name,
    date_of_birth,
    cpf,
    rg,
    ctps,
    email,
    password,
    phone,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 8)

    const validateEmployeeEmail =
      await this.employeesRepository.findByEmail(email)
    if (validateEmployeeEmail) throw new EmailAlreadyRegisteredError()

    const validateEmployeeCpf = await this.employeesRepository.findByCpf(cpf)
    if (validateEmployeeCpf) throw new CpfAlreadyRegisteredError()

    const validateEmployeeCtps = await this.employeesRepository.findByCtps(ctps)
    if (validateEmployeeCtps) throw new CtpsAlreadyRegisteredError()

    const employee = await this.employeesRepository.create({
      name,
      date_of_birth,
      cpf,
      rg,
      ctps,
      email,
      password_hash,
      phone,
    })

    return { employee }
  }
}

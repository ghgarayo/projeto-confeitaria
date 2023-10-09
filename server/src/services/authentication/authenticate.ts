import { Customer, Employee } from '@prisma/client'
import { CustomersRepository } from '@/repositories/interfaces/customers-repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees-repository'
import { CustomersLoginsRepository } from '@/repositories/interfaces/customers-logins-repository'
import { EmployeesLoginRepository } from '@/repositories/interfaces/employees-logins-repository'

import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  user: Customer | Employee
}

export class AuthenticateService {
  constructor(
    private loginsRepository:
      | CustomersLoginsRepository
      | EmployeesLoginRepository,
    private userRepository: CustomersRepository | EmployeesRepository,
  ) {}

  async handle({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user || !user?.password_hash) {
      throw new InvalidCredentialsError()
    }

    const passwordMatch = await compare(password, user.password_hash)
    if (!passwordMatch) throw new InvalidCredentialsError()

    // const userId = user.id

    // console.log('userId', userId)

    // const login = await this.loginsRepository.create({
    //   employee_id: userId,
    //   customer_id: userId,
    // })

    // console.log('login', login)

    return { user }
  }
}

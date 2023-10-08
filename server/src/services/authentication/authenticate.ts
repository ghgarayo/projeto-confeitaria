import { CustomersRepository } from '@/repositories/interfaces/customers-repository'
import { CustomersLoginsRepository } from '@/repositories/interfaces/customers-logins-repository'

import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { Customer } from '@prisma/client'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  customer: Customer
}

export class AuthenticateService {
  constructor(
    private customersLoginsRepository: CustomersLoginsRepository,
    private customersRepository: CustomersRepository,
  ) {}

  async handle({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const customer = await this.customersRepository.findByEmail(email)

    if (!customer || !customer?.password_hash) {
      throw new InvalidCredentialsError()
    }

    const passwordMatch = await compare(password, customer.password_hash)
    if (!passwordMatch) throw new InvalidCredentialsError()

    const customerId = customer.id

    console.log('customerId', customerId)

    const login = await this.customersLoginsRepository.create({
      customer_id: customerId,
    })

    console.log('login', login)

    return { customer }
  }
}

import { CustomersRepository } from '@/repositories/interfaces/customers-repository'
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
  constructor(private CustomersRepository: CustomersRepository) {}

  async handle({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const customer = await this.CustomersRepository.findByEmail(email)

    if (!customer || !customer.password_hash)
      throw new InvalidCredentialsError()

    const passwordMatch = await compare(password, customer.password_hash)

    if (!passwordMatch) throw new InvalidCredentialsError()

    return { customer }
  }
}

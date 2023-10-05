import { CustomersRepository } from '@/repositories/interfaces/customers-repository'
import { hash } from 'bcryptjs'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

type AuthenticateServiceResponse = void

export class AuthenticateService {
  constructor(private CustomersRepository: CustomersRepository) {}

  async handle({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const customer = await this.CustomersRepository.findByEmail(email)

    if (!customer) {
      throw new Error('Customer not found')
    }

    const password_hash =
      password !== undefined ? await hash(password, 8) : null
  }
}

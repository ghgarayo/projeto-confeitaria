import { Customer } from '@prisma/client'
import { hash } from 'bcryptjs'

import { CustomersRepository } from '@/repositories/interfaces/customers-repository'

import { CustomerEmailAlreadyRegisteredError } from '../errors/customer-email-already-registered-error'
import { CustomerCpfAlreadyRegisteredError } from '../errors/customer-cpf-already-registered-error'

interface registerServiceRequest {
  name: string
  cpf: string
  date_of_birth?: string
  email?: string
  password?: string
  phone: string
}

interface RegisterServiceResponse {
  customer: Customer
}

// Dependency Inversion Principle

export class RegisterService {
  /* 
    O RegisterService não precisa saber como o customersRepository funciona,
    ele só precisa saber que o customersRepository tem um método chamado
    create que recebe um objeto com os dados do cliente e salva no banco de dados.
  */

  constructor(private customersRepository: CustomersRepository) {}

  async handle({
    name,
    cpf,
    date_of_birth,
    email,
    password,
    phone,
  }: registerServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash =
      password !== undefined ? await hash(password, 8) : null

    const validateCustomerEmail =
      email !== undefined
        ? await this.customersRepository.findByEmail(email)
        : null

    if (validateCustomerEmail) {
      throw new CustomerEmailAlreadyRegisteredError()
    }

    const validateCustomerCpf = await this.customersRepository.findByCpf(cpf)

    if (validateCustomerCpf) {
      throw new CustomerCpfAlreadyRegisteredError()
    }

    const customer = await this.customersRepository.create({
      name,
      cpf,
      date_of_birth,
      email,
      password_hash,
      phone,
    })

    return { customer }
  }
}

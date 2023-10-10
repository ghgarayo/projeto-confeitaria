import { Customer } from '@prisma/client'
import { hash } from 'bcryptjs'

import { CustomersRepository } from '@/repositories/interfaces/customers-repository'

import { EmailAlreadyRegisteredError } from '../errors/email-already-registered-error'
import { CpfAlreadyRegisteredError } from '../errors/cpf-already-registered-error'
import { validateCpf } from '../utils/validate-cpf'
import { InvalidCpfError } from '../errors/invalid-cpf-error'

interface RegisterServiceRequest {
  name: string
  cpf: string
  date_of_birth?: string
  email?: string
  password?: string
  phone: string
  customer_category_id?: string
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
    customer_category_id,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = password ? await hash(password, 8) : null

    const validateCustomerEmail = email
      ? await this.customersRepository.findByEmail(email)
      : null

    if (validateCustomerEmail) throw new EmailAlreadyRegisteredError()

    const validateCustomerCpf = cpf
      ? await this.customersRepository.findByCpf(cpf)
      : null

    if (validateCustomerCpf) throw new CpfAlreadyRegisteredError()

    if (validateCpf(cpf)) throw new InvalidCpfError()

    const customer = await this.customersRepository.create({
      name,
      cpf,
      date_of_birth,
      email,
      password_hash,
      phone,
      customer_category_id,
    })

    return { customer }
  }
}

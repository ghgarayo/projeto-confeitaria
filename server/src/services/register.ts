import { prisma } from '@/lib/prisma'
import { CustomersRepository } from '@/repositories/interfaces/customers-repository'
import { hash } from 'bcryptjs'
import { CustomerAlreadyExistsError } from './errors/customer-already-exists-error'

interface registerServiceRequest {
  name: string
  cpf: string
  date_of_birth?: string
  email?: string
  password?: string
  phone: string
}

// Dependency Inversion Principle

export class RegisterService {
  /* O RegisterService não precisa saber como o customersRepository funciona,
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
  }: registerServiceRequest) {
    const password_hash =
      password !== undefined ? await hash(password, 8) : null

    const customer =
      email !== undefined
        ? await this.customersRepository.findByEmail(email)
        : null

    if (customer) {
      throw new CustomerAlreadyExistsError()
    }

    await this.customersRepository.create({
      name,
      cpf,
      date_of_birth,
      email,
      password_hash,
      phone,
    })
  }
}

import { hash } from 'bcryptjs'
import { CustomersRepository } from '@/repositories/interfaces/customers-repository'
import { CustomerNotFoundError } from '../errors/customer-not-found-error'

interface UpdateServiceRequest {
  id: string
  name?: string | null
  cpf?: string | null
  date_of_birth?: string | null
  email?: string | null
  password?: string | null
  phone?: string | null
  updated_at?: Date | null
}

export class UpdateService {
  constructor(private customersRepository: CustomersRepository) {}

  async handle({
    id,
    name,
    cpf,
    date_of_birth,
    email,
    password,
    phone,
  }: UpdateServiceRequest) {
    const customerOnDB = await this.customersRepository.findById(id)
    if (!customerOnDB) throw new CustomerNotFoundError()

    await this.customersRepository.update({
      id,
      name: name ?? customerOnDB.name,
      cpf: cpf ?? customerOnDB.cpf,
      date_of_birth: date_of_birth ?? customerOnDB.date_of_birth,
      email: email ?? customerOnDB.email,
      password_hash: password
        ? await hash(password, 8)
        : customerOnDB.password_hash,
      phone: phone ?? customerOnDB.phone,
      updated_at: new Date(),
    })
  }
}

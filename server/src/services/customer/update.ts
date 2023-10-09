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
    let password_hash: string | null
    const customerOnDB = await this.customersRepository.findById(id)
    if (!customerOnDB) throw new CustomerNotFoundError()

    if (name === '' || !name) name = customerOnDB.name
    if (cpf === '' || !cpf) cpf = customerOnDB.cpf
    if (date_of_birth === '' || !date_of_birth)
      date_of_birth = customerOnDB.date_of_birth
    if (email === '' || !email) email = customerOnDB.email

    if (password !== '' && password) {
      password_hash = await hash(password, 8)
    } else {
      password_hash = customerOnDB.password_hash
    }

    if (phone === '' || !phone) phone = customerOnDB.phone

    await this.customersRepository.update({
      id,
      name,
      cpf,
      date_of_birth,
      email,
      password_hash: password_hash ?? customerOnDB.password_hash,
      updated_at: new Date(),
    })
  }
}

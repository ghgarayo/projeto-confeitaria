import { CustomersRepository } from '@/repositories/interfaces/customers-repository'
import { CustomerNotFoundError } from '../errors/customer-not-found-error'

interface InactivateServiceRequest {
  customer_id: string
}

export class InactivateService {
  constructor(private customersRepository: CustomersRepository) {}

  async handle({ customer_id }: InactivateServiceRequest) {
    const customerOnDB = await this.customersRepository.findById(customer_id)
    if (!customerOnDB) throw new CustomerNotFoundError()

    await this.customersRepository.inactivateUser(customer_id)
  }
}

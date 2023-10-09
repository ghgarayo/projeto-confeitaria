import { CustomersRepository } from '@/repositories/interfaces/customers-repository'

import { Customer } from '@prisma/client'
import { CustomerNotFoundError } from '../errors/customer-not-found-error'

interface GetUserServiceRequest {
  customerId: string
}

interface GetUserServiceResponse {
  customer: Customer
}

export class GetUserProfileService {
  constructor(private customersRepository: CustomersRepository) {}

  async handle({
    customerId,
  }: GetUserServiceRequest): Promise<GetUserServiceResponse> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) throw new CustomerNotFoundError()

    return { customer }
  }
}

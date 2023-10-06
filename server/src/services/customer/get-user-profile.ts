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
  constructor(private CustomersRepository: CustomersRepository) {}

  async handle({
    customerId,
  }: GetUserServiceRequest): Promise<GetUserServiceResponse> {
    const customer = await this.CustomersRepository.findById(customerId)

    if (!customer) throw new CustomerNotFoundError()

    return { customer }
  }
}

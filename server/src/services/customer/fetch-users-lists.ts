import { CustomersRepository } from '@/repositories/interfaces/customers-repository'
import { Customer } from '@prisma/client'

interface FetchCustomersListResponse {
  customers: Customer[]
}

let customers: Customer[] = []

export class FetchCustomersListService {
  constructor(private customerRepository: CustomersRepository) {}

  async handle(): Promise<FetchCustomersListResponse> {
    const fetchedCustomers = await this.customerRepository.fetchList()
    customers = fetchedCustomers || []

    if (!customers) throw new Error('lista indisponivel')

    return { customers }
  }
}
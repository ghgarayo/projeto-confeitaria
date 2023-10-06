import { Prisma } from '@prisma/client'
import { AddressesRepository } from '../interfaces/address-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAddressRepository implements AddressesRepository {
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = await prisma.address.create({
      data,
    })

    return address
  }
}

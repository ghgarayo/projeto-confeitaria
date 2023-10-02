import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '@/repositories/prisma-customers-repository'

interface registerServiceRequest {
  name: string
  cpf: string
  date_of_birth?: string
  email?: string
  password?: string
  phone: string
}

export async function registerService({
  name,
  cpf,
  date_of_birth,
  email,
  password,
  phone,
}: registerServiceRequest) {
  const password_hash = password !== undefined ? await hash(password, 8) : null

  const customerWithSameEmail =
    email !== undefined
      ? await prisma.customer.findUnique({
          where: { email },
        })
      : null

  if (customerWithSameEmail) {
    throw new Error('E-mail já cadastrado!')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    cpf,
    date_of_birth,
    email,
    password_hash,
    phone,
  })
}

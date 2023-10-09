/*
Esta função serve para criar uma instância do AuthenticateService e retornar ela.

Como o AuthenticateService depende de uma instância de um repositório, 
neste caso o PrismaCustomersRepository, precisamos criar uma instância de 
PrismaCustomersRepository e passar ela como parâmetro para o 
AuthenticateService.

O AuthenticateService não precisa saber como o PrismaCustomersRepository funciona,
ele só precisa saber que o PrismaCustomersRepository tem um método que buscara
um cliente no banco de dados para validações.

*/

import { AuthenticateService } from '../authentication/authenticate'

import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository'
import { PrismaCustomersLoginsRepository } from '@/repositories/prisma/prisma-customers-login-repository'
import { PrismaEmployeesLoginRepository } from '@/repositories/prisma/prisma-employees-login-repository'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

export async function makeAuthenticateService(email: string) {
  const prismaCustomersRepository = new PrismaCustomersRepository()
  const prismaEmployeesRepository = new PrismaEmployeesRepository()
  const prismaCustomersLoginsRepository = new PrismaCustomersLoginsRepository()
  const prismaEmployeesLoginsRepository = new PrismaEmployeesLoginRepository()

  let repositoryToUse: PrismaCustomersRepository | PrismaEmployeesRepository
  let loginsRepositoryToUse:
    | PrismaCustomersLoginsRepository
    | PrismaEmployeesLoginRepository

  const user = await prismaCustomersRepository.findByEmail(email)

  if (user instanceof PrismaCustomersRepository) {
    repositoryToUse = prismaCustomersRepository
    loginsRepositoryToUse = prismaCustomersLoginsRepository
  } else if (user instanceof PrismaEmployeesRepository) {
    repositoryToUse = prismaEmployeesRepository
    loginsRepositoryToUse = prismaEmployeesLoginsRepository
  } else {
    throw new InvalidCredentialsError()
  }

  const authenticateService = new AuthenticateService(
    loginsRepositoryToUse,
    repositoryToUse,
  )

  return authenticateService
}

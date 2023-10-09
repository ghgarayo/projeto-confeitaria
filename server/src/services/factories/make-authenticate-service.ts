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

import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository'

import { AuthenticateService } from '../authentication/authenticate'
import { PrismaCustomersLoginsRepository } from './../../repositories/prisma/prisma-customers-login-repository'
import { PrismaEmployeesLoginRepository } from '@/repositories/prisma/prisma-employees-login-repository'

export async function makeAuthenticateService(email: string) {
  const prismaCustomersRepository = new PrismaCustomersRepository()
  const prismaCustomersLoginsRepository = new PrismaCustomersLoginsRepository()
  const prismaEmployeesRepository = new PrismaEmployeesRepository()
  const prismaEmployeesLoginsRepository = new PrismaEmployeesLoginRepository()

  let repositoryToUse: PrismaCustomersRepository | PrismaEmployeesRepository
  let loginsRepositoryToUse:
    | PrismaEmployeesLoginRepository
    | PrismaCustomersLoginsRepository

  let user = await prismaCustomersRepository.findByEmail(email)

  if (!user) {
    user = await prismaEmployeesRepository.findByEmail(email)
    repositoryToUse = prismaEmployeesRepository
    loginsRepositoryToUse = prismaEmployeesLoginsRepository
  } else {
    repositoryToUse = prismaCustomersRepository
    loginsRepositoryToUse = prismaCustomersLoginsRepository
  }

  const authenticateService = new AuthenticateService(
    loginsRepositoryToUse,
    repositoryToUse,
  )

  return authenticateService
}

import { PrismaCustomersLoginsRepository } from '@/repositories/prisma/prisma-customers-login-repository'
import { AuthenticateService } from '../authentication/authenticate'
import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'

export function makeAuthenticateService() {
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

  const prismaCustomersLoginsRepository = new PrismaCustomersLoginsRepository()
  const prismaCustomersRepository = new PrismaCustomersRepository()

  const authenticateService = new AuthenticateService(
    prismaCustomersLoginsRepository,
    prismaCustomersRepository,
  )

  return authenticateService
}

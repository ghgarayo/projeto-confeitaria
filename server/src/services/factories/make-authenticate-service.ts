import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { AuthenticateService } from '../authentication/authenticate'

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

  const prismaCustomersRepository = new PrismaCustomersRepository()
  const authenticateService = new AuthenticateService(prismaCustomersRepository)

  return authenticateService
}

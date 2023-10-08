import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { RegisterService } from '../customer/register'

export function makeRegisterService() {
  /*
      Esta função serve para criar uma instância do RegisterService e retornar ela.
     
      Como o RegisterService depende de uma instância de um repositório, 
      neste caso o PrismaCustomersRepository, precisamos criar uma instância de 
      PrismaCustomersRepository e passar ela como parâmetro para o 
      RegisterService.

      O RegisterService não precisa saber como o PrismaCustomersRepository funciona,
      ele só precisa saber que o PrismaCustomersRepository tem um método chamado
      create que recebe um objeto com os dados do cliente e salva no banco de dados.
    */

  const prismaCustomersRepository = new PrismaCustomersRepository()
  const registerService = new RegisterService(prismaCustomersRepository)
  return registerService
}

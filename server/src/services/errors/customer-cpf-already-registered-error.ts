export class CustomerCpfAlreadyRegisteredError extends Error {
  constructor() {
    super('CPF already exists')
    this.name = 'CustomerCpfAlreadyRegisteredError'
  }
}

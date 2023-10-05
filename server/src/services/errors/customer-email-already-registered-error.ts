export class CustomerEmailAlreadyRegisteredError extends Error {
  constructor() {
    super('Customer already exists')
    this.name = 'CustomerEmailAlreadyRegisteredError'
  }
}

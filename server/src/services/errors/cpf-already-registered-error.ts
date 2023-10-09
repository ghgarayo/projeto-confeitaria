export class CpfAlreadyRegisteredError extends Error {
  constructor() {
    super('CPF already registered')
    this.name = 'CpfAlreadyRegisteredError'
  }
}

export class CtpsAlreadyRegisteredError extends Error {
  constructor() {
    super('CTPS already registered')
    this.name = 'CtpsAlreadyRegisteredError'
  }
}

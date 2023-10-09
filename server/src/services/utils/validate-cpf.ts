export function validateCpf(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '') // Remove caracteres não numéricos
  if (cpf.length !== 11) return false // Um CPF deve ter 11 dígitos

  // Calcula o primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let primeiroDigito = 11 - (soma % 11)
  if (primeiroDigito > 9) primeiroDigito = 0

  // Calcula o segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  let segundoDigito = 11 - (soma % 11)
  if (segundoDigito > 9) segundoDigito = 0

  // Verifica se os dígitos calculados correspondem aos dígitos do CPF
  if (
    parseInt(cpf.charAt(9)) === primeiroDigito &&
    parseInt(cpf.charAt(10)) === segundoDigito
  ) {
    return true
  } else {
    return false
  }
}

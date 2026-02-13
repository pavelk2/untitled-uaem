export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0
}

export const isMinLength = (value: string, min: number): boolean => {
  return value.length >= min
}

export const isMaxLength = (value: string, max: number): boolean => {
  return value.length <= max
}

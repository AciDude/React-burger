export const checkName = string =>
  Boolean(string.match(/^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9-]+$/))

export const checkEmail = string =>
  Boolean(string.match(/\A[^@]+@([^@\.]+\.)+[^@\.]+\z/))

export const checkPassword = string =>
  Boolean(string.match(/[0-9a-zA-Z!@#$%^&*]{6,}/))

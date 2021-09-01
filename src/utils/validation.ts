export function validateEmail(value: string): string | undefined {
  const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let error;
  if (!value) {
    error = "O email é necessário";
  } else if (!exp.test(value)) {
    error = "Email inválido";
  }
  return error;
}

export function validatePassword(value: string): string | undefined {
  const exp = /(?=.*[0-9a-zA-Z]).{6,}/;
  let error;
  if (!value) {
    error = "A senha é necessária";
  } else if (!exp.test(value)) {
    error = "Senha inválida";
  }
  return error;
}

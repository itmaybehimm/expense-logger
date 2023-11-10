export function passwordValid(password: string): boolean {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return regex.test(password);
}

export function usernameValid(username: string): boolean {
  const regex = /^[a-z][a-z0-9_]{7,20}$/;
  return regex.test(username);
}

export function nameValid(name: string): boolean {
  const regex = /^[A-Za-z]{4,20}$/;
  return regex.test(name);
}

export function emailValid(email: string): boolean {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}

// export function dobValid(dob:string);

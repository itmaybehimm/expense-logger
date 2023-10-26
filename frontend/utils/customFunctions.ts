function isSpecialChar(ch: string): boolean {
  const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "_", "-"];
  return specialChars.includes(ch);
}

export function passwordValid(password: string): boolean {
  let l = 0,
    u = 0,
    p = 0,
    d = 0;

  if (password.length >= 8) {
    for (let i = 0; i < password.length; i++) {
      // Counting lowercase alphabets
      if (password[i].match(/[a-z]/)) {
        l++;
      }

      // Counting uppercase alphabets
      if (password[i].match(/[A-Z]/)) {
        u++;
      }

      // Counting digits
      if (password[i].match(/\d/)) {
        d++;
      }

      // Counting the mentioned special characters
      if (isSpecialChar(password[i])) {
        p++;
      }
    }

    if (
      l >= 1 &&
      u >= 1 &&
      p >= 1 &&
      d >= 1 &&
      l + p + u + d === password.length
    ) {
      return true;
    }
  }

  return false;
}

export function usernameValid(username: string): boolean {
  //first cheacarter can't be digit or _
  if (username[0].match(/\d/) || username.length < 8 || username[0] === "_") {
    return false;
  }

  for (let i = 0; i < username.length; i++) {
    if (
      //character can be digit
      !username[i].match(/\d/) &&
      //character can be lower case
      !username[i].match(/[a-z]/) &&
      //at most character can be _ add logic later
      username[i] !== "_"
    ) {
      return false;
    }
  }

  return true;
}

export const emailValidator = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
};

export const passwordValidator = (password) => {
  return password.length >= 8;
};

export const rePasswordValidator = (prevPassword, password) => {
  return prevPassword === password && password.length >= 8;
};

export const isFieldBlank = (input) => {
  return input.trim().length > 0;
};

export const isNumber = (input) => {
  return !isNaN(+input);
};

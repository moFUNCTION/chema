export const ValidateEmail = (email) => {
  const expression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (expression.test(email)) {
    return true;
  } else {
    return false;
  }
};

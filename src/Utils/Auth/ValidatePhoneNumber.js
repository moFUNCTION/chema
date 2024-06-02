export const ValidatePhoneNumber = (phoneNumber) => {
  const expression = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  function CheckValue(value) {
    if (expression.test(value)) {
      return true;
    } else {
      return false;
    }
  }
  if (phoneNumber.startsWith("0")) {
    return CheckValue(phoneNumber.slice(1, phoneNumber.length));
  } else {
    return CheckValue(phoneNumber);
  }
};

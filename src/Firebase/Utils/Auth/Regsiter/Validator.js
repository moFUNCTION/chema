import { ValidatePhoneNumber } from "../../../../Utils/Auth/ValidatePhoneNumber";

export const Validator = ({
  email,
  password,
  grade,
  phoneNumber,
  parentPhoneNumber,
  username,
}) => {
  const emailRejex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const grades = ["first-secondary", "second-secondary", "third-secondary"];
  const errors = [];
  if (!emailRejex.test(email)) {
    errors.push("please inser valid email");
  } else if (password.length < 8) {
    errors.push("password at least must be 8 characters");
  } else if (!grades.includes(grade)) {
    errors.push("please insert valid grade");
  } else if (!ValidatePhoneNumber(phoneNumber)) {
    errors.push("please insert valid phone Number");
  } else if (!ValidatePhoneNumber(parentPhoneNumber)) {
    errors.push("please insert valid parent phone Number");
  } else if (!username) {
    errors.push("please insert username");
  }
  return errors[0];
};

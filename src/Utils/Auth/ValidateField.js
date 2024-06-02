export const ValidateField = ({ field, RequiredLength }) => {
  if (field.length >= RequiredLength) {
    return true;
  } else {
    return false;
  }
};

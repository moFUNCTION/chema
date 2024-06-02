export const ValidateImage = ({ image, maxSize }) => {
  if (image) {
    if ((image.size * 10 ** -6).toFixed(2) > maxSize) {
      return [false, "Personal Image Max Size is 60mb"];
    } else {
      return [true];
    }
  } else {
    return [false, "image is required"];
  }
};

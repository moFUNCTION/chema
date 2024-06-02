export const LanguageDetect = (text) => {
  let arabicPattern = /[\u0600-\u06FF]/; // Arabic Unicode range
  let englishPattern = /[a-zA-Z]/; // English alphabet range
  if (arabicPattern.test(text)) {
    return "Arabic";
  } else if (englishPattern.test(text)) {
    return "English";
  }
};

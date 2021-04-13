export const pluralize = (str: string, num: number) => {
  return num === 1 ? str : `${str}s`;
};

export const removeLeadingZeros = (strNumber: string) =>
  strNumber.replace(/^0+/, "");

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
  Math.ceil(min);

export const getRandomElement = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const formatPhoneNumber = (str: string) => {
  //Filter only numbers from the input
  let cleaned = ("" + str).replace(/\D/g, "");

  //Check if the input is of correct
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    //Remove the matched extension code
    //Change this to format for any country code.
    let intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }

  return null;
};

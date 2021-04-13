export const pluralize = (str: string, num: number) => {
  return num === 1 ? str : `${str}s`;
};

export const removeLeadingZeros = (strNumber: string) =>
  strNumber.replace(/^0+/, "");

export const addCommaToText = (value: any): string => {
  return value
    .toString()
    .replace(/,/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

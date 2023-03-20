export const formatNumber = (num: number) => {
  return num
    ? new Intl.NumberFormat().format(num)
    : new Intl.NumberFormat().format(0);
};

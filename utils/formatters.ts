
export const formatNumber = (num: number): string => {
  return num.toFixed(2);
};

export const formatCurrency = (num: number, currency = "MAD"): string => {
  const fixedNum = formatNumber(num);
  const parts = fixedNum.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${integerPart},${parts[1]} ${currency}`;
};

export const formatPercent = (num: number): string => {
  return `${formatNumber(num)}%`;
}

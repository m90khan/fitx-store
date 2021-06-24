export default function formatCurrency(price = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  if (price % 100 === 0) {
    options.minimumFractionDigits = 0;
  }
  const format = Intl.NumberFormat('en-US', options);

  return format.format(price / 100);
}

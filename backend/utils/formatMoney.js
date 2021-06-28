const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

module.exports = function formatMoney(cents) {
  const dollars = cents / 100;
  return formatter.format(dollars);
};

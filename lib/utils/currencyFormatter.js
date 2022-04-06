const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const currencyFormatter = (data) => {
  return formatter.format(data);
};

export default currencyFormatter;

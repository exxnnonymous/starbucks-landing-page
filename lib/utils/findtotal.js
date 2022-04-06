export default function countTotal(arr) {
  let totalPrice = arr.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  let totalItem = arr.reduce((total, item) => {
    return total + item.count;
  }, 0);
  return {
    itemsCount: totalItem,
    price: totalPrice,
  };
}

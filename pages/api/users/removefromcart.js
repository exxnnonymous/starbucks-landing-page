import User from "@/model/user";
import connectDB from "@/middleware/connectDB";
import findTotal from "@/lib/utils/findtotal";

async function addtocart(req, res) {
  if (req.method !== "POST") {
    return res.status(422).json({ message: "req_method_not_supported" });
  }

  let { product_id, user_id } = req.body;
  if (!product_id || !user_id) {
    return res.status(422).json({ message: "data_incomplete" });
  }

  try {
    const user = await User.findById(user_id);
    if (user) {
      const { cart } = user;

      let newCart = cart;
      let foundItem = newCart.items.filter((item) => item._id == product_id);

      if (foundItem.length === 0) {
        return res.status(200).json(cart);
      } else {
        let objIndex = newCart.items.findIndex(
          (item) => item._id === product_id
        );
        if (newCart.items[objIndex].count > 1) {
          newCart.items[objIndex].count -= 1;
        } else {
          newCart.items = newCart.items.filter(
            (item) => item._id !== product_id
          );
        }
      }

      newCart.total = findTotal(newCart.items);

      const updatedUser = await User.findOneAndUpdate(
        { _id: user_id },
        { $set: { cart: newCart } }
      );

      return res.status(200).json(updatedUser.cart);
    }
    return res.status(400).json({ message: "User doesn't exists" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error occured!", err });
  }
}

export default connectDB(addtocart);

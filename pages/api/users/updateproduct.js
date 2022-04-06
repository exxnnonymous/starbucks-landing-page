import User from "@/model/user";
import connectDB from "@/middleware/connectDB";
import findTotal from "@/lib/utils/findtotal";

export default connectDB(async function updateproduct(req, res) {
  if (req.method !== "POST") {
    return res.status(422).json({ message: "req_method_not_supported" });
  }

  let { bought_product, user_id } = req.body;
  if (!bought_product || !user_id) {
    return res.status(422).json({ message: "data_incomplete" });
  }

  try {
    const user = await User.findById(user_id);

    if (user) {
      const { products } = user;

      const newProd = products;

      bought_product.forEach((product) => {
        let foundItem = newProd.items.filter(
          (item) => item._id == product._id
        );

        if (foundItem.length === 0) {
          newProd.items = [...newProd.items, product];
        }
        else{
            let objIndex = newProd.items.findIndex(item=>item._id===product._id)
            newProd.items[objIndex].count +=product.count
          }
      });

      newProd.total = findTotal(newProd.items)

      const updatedUser = await User.findOneAndUpdate(
        { _id: user_id },
        {$set:{products:newProd}},
        {returnDocument:"after"}
      )

      return res.status(200).json(updatedUser.product);
    }

    return res.status(200).json({ message: "User doesn't exists" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error occured!" });
  }
}
)
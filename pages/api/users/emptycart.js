import User from "@/model/user";
import connectDB from "@/middleware/connectDB";

async function emptycart(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "req_method_not_supported" });
  }

  let { user_id } = req.body;
  if (!user_id) {
    return res.status(422).json({ message: "data_incomplete" });
  }
  try {
    const user = await User.findById(user_id);
    if (user) {
      await User.findOneAndUpdate(
        { _id: user_id },
        {
          $set: {
            cart: {
              total: {
                price: 0,
                itemsCount: 0,
              },
              items: [],
            },
          },
        }
      );

      return res.status(200).json({ message: "removed items from cart!" });
    }
    return res.status(200).json({ message: "User doesn't exists!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error occured!" });
  }
}

export default connectDB(emptycart);

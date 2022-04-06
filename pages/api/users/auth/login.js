import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import User from "@/model/user";
import connectDB from "@/middleware/connectDB";
import findTotal from "@/lib/utils/findtotal";

async function register(req, res) {
  // filtering request method
  if (req.method !== "POST") {
    return res.status(422).json({ message: "req_method_not_supported" });
  }

  let { password, email, itemsInCart } = req.body;

  //   checking if data is incomplete
  if (!password || !email) {
    return res.status(422).json({ message: "data_incomplete" });
  }

  email = email.toLowerCase();

  try {
    // finding user
    let _user = await User.findOne({ email: { $eq: email } });
    if (!_user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    //   checking password
    const match = await bcrypt.compare(password, _user.password);
    if (match) {
      const user_data = { _id: _user._id };
      const jwt_token = jwt.sign(user_data, process.env.JWTSECRET, {
        expiresIn: "7d",
      });
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", jwt_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "Lax",
          maxAge: 3600000 * 24 * 7,
          path: "/",
        })
      );


      if(_user.cart.items.length === 0){
        if (itemsInCart && itemsInCart.length >= 1) {
          const { itemsCount, price } = findTotal(itemsInCart);
  
          _user =  await User.findOneAndUpdate(
            {
              _id: _user._id,
            },
            {
              $set: {
                cart: {
                  total: {
                    itemsCount,
                    price,
                  },
                  items: itemsInCart,
                },
              },
            },
            {returnDocument:"after"}
          );
        }
      }


      return res
        .status(200)
        .json({ user: _user, message: "You logged in successfully!" });
    } else {
      return res.status(401).json({ message: "Invalid email or password!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error occured!" });
  }
}

export default connectDB(register);

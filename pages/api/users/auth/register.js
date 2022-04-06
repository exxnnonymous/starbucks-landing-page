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

  let { name, password, email,itemsInCart } = req.body;
  //   checking if data is incomplete
  if (!name || !password || !email) {
    return res.status(422).json({ message: "data_incomplete" });
  }

  email = email.toLowerCase();
  //   checking if email has been taken
  const found_user = await User.findOne({ email: { $eq: email } });

  if (found_user) {
    return res
      .status(401)
      .json({ message: "This email has already been registered" });
  }

  //   creating user
  try {
    const hashPass = await bcrypt.hash(password, 12);
    let _count = 0, _price = 0, _items=[];
    if(itemsInCart && itemsInCart.length >= 1){
      const { itemsCount, price } = findTotal(itemsInCart);
      _count = itemsCount
      _price = price
      _items = itemsInCart
    }

    const _user = new User({
      name,
      email,
      password: hashPass,
      cart: {
        total: {
          itemsCount: _count,
          price: _price,
        },
        items: _items,
      },
      products: {
        total: {
          itemsCount: 0,
          price: 0,
        },
        items: [],
      },
    });
    let created_user = await _user.save();

    const jwt_token = jwt.sign(
      { _id: created_user._id },
      process.env.JWTSECRET,
      { expiresIn: "7d" }
    );

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

    created_user.password = undefined;

    return res.status(200).json({
      user: created_user,
      message: "You created account successfully!",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error Occured!" });
  }
}

export default connectDB(register);

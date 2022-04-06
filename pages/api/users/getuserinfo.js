import jwt from "jsonwebtoken";
import { parse } from "cookie";

import User from "@/model/user";
import connectDB from "@/middleware/connectDB";

async function getUserInfo(req, res) {
  if (req.method !== "GET") {
    return res.status(422).json({ message: "req_method_not_supported" });
  }

  if (!req.headers.cookie) {

   return res.status(500).json({ message: "you are not authenticated" });
  }

  const cookie = parse(req.headers.cookie).token;
  if (cookie) {
    try {
      const decoded = jwt.verify(cookie, process.env.JWTSECRET);
      const response = await User.findById(decoded._id);

      if (response) {
        response.password = undefined;
        return res.status(200).json({user:response});
      } else {
        return res.status(400).json({ message: "User does not exists" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(400).json({ message: "unauthorized" });
  }
}

export default connectDB(getUserInfo);

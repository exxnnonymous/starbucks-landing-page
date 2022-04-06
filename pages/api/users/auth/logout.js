import {  serialize } from "cookie";

async function logout(req, res) {
  if (req.method !== "POST") {
    return res.status(422).json({ message: "req_method_not_supported" });
  }

  try {
    res.setHeader(
      "Set-Cookie",
      serialize("token", "no", {
        maxAge: 0,
        path: "/",
      })
    );
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
}

export default logout

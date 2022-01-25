import { dbConnect, dbDisconnect } from "../../../utils/db";

import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function loginHandler(req, res) {
  console.log(req.body);
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { email, password } = req.body;
      //   console.log(`${email}, ${password}`);
      const user = await User.findOne({ email: email });
      await dbDisconnect();
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const userInfo = {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        const token = jwt.sign(userInfo, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        // console.log({ token, ...userInfo });
        return res.status(200).json({ token, ...userInfo });
      } else {
        res.status(401).json({ message: "invalid user of password" });
      }
    } else {
      res.status(500).json({ message: "invalid request" });
    }
  } catch (err) {
    console.log(err);
  }
}

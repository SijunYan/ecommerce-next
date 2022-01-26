import { dbConnect, dbDisconnect } from "../../../utils/db";

import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function registerHandler(req, res) {
  console.log(req.body);
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { name, email, password } = req.body;
      // validate the email is in DB already? Unique?

      //   console.log(`${email}, ${password}`);
      const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 2),
        isAdmin: false,
      });
      const user = await newUser.save();
      const founduser = await User.findOne({ email: email });
      await dbDisconnect();
      const userInfo = {
        _id: founduser._id,
        name: name,
        email: email,
        isAdmin: false,
      };
      const token = jwt.sign(userInfo, process.env.JWT_KEY, {
        expiresIn: "1h",
      });
      // console.log({ token, ...userInfo });
      return res.status(200).json({ token, ...userInfo });
    } else {
      res.status(500).json({ message: "invalid request" });
    }
  } catch (err) {
    console.log(err);
  }
}

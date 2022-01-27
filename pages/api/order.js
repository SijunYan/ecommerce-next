import { dbConnect, dbDisconnect } from "../../utils/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Order from "../../models/Order";
import nc from "next-connect";

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer ......
    const token = authorization.slice(7);
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        res.status(401).send({ message: "token is invalid" });
      } else {
        console.log("auth succeed");
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "tocken is not found" });
  }
};

const orderHandler = nc()
  .use(isAuth)
  .post(async (req, res) => {
    try {
      const { body, user } = req;
      const newOrederData = { ...body, user: user._id };
      await dbConnect();
      const newOrder = new Order(newOrederData);
      const order = await newOrder.save();
      const populatedorder = await Order.findById(order._id)
        .populate({
          path: "items",
        })
        .populate("user");
      console.log(populatedorder);
      await dbDisconnect();
      res.status(201).json(populatedorder);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  });

export default orderHandler;

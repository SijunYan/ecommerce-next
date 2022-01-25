import nc from "next-connect";
import { dbConnect, dbDisconnect } from "../../utils/db";
import Product from "../../models/Prodoct";
import data from "../../utils/data";
import User from "../../models/User";

const handler = nc().get(async (req, res) => {
  await dbConnect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await User.deleteMany();
  await User.insertMany(data.users);
  await dbDisconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;

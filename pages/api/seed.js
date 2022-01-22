import nc from "next-connect";
import { dbConnect, dbDisconnect } from "../../utils/db";
import Product from "../../utils/models/Prodoct";
import data from "../../utils/data";

const handler = nc().get(async (req, res) => {
  await dbConnect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await dbDisconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;

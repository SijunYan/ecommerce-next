import nc from "next-connect";
import { dbConnect, dbDisconnect } from "../../../utils/db";
import Product from "../../../models/Prodoct";

const handler = nc().get(async (req, res) => {
  await dbConnect();
  const products = await Product.find({});
  await dbDisconnect();
  res.send(products);
});

export default handler;

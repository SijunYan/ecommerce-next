//  have not use even time

import nc from "next-connect";
import { dbConnect, dbDisconnect } from "../../../utils/db";
import Product from "../../../models/Prodoct";

const handler = nc().get(async (req, res) => {
  await dbConnect();
  const product = await Product.findById(req.query.id);
  await dbDisconnect();
  res.send(product);
});

export default handler;

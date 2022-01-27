import mongoose from "mongoose";
import Product from "./Prodoct";
import User from "./User";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    adressInfo: {
      fullName: { type: String, required: true },
      streetAdress: { type: String, required: true },
      suburb: { type: String, required: true },
      stateName: { type: String, required: true },
      postCode: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    price: {
      itemsPrice: { type: Number, required: true },
      taxPrice: { type: Number, required: true },
      shippingPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
    orderStatus: {
      isPaid: { type: Boolean, required: true, default: false },
      isDelivered: { type: Boolean, required: true, default: false },
      paidAt: { type: Date },
      deliveredAt: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;

import mongoose from "mongoose";
const PaymentSchema: any = new mongoose.Schema({
  products: [
    {
      productId: { type: String, required: true },
      noOfItems: { type: Number, required: true },
    },
  ],
  addedAt: {
    type: Date,
    default: new Date(),
  },
});

let Products = mongoose.model("Orders", PaymentSchema);
export default Products;

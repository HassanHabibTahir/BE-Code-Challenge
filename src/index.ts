import express from "express";
import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import PaymentSchema from "./modules/order";
import Products from "./modules/products";

import { _Order } from "./types/order";
import { ValidateRegisterInput } from "./validation/validation";
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const app = express();
app.post("/order", async (req: Request, res: Response) => {
  const { itemId, quantity, cardNo, expiryDate, CVC, amount }: _Order =
    req.body;
  let orderId = Products.findOne({ itemId: itemId });
  if (!orderId) {
    return res.status(400).json({ error: "no product found" });
  }
  const { errors, isValid } = ValidateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "",
      payment_method: cardNo,
      confirm: true,
    });
    const result = new PaymentSchema(req.body);
    res
      .status(200)
      .json({ success: true, message: "Payment Successful!", dbData: result });
  } catch (error) {
    console.log("error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});
const PORT = process.env.PORT || 8000;
mongoose
  .connect("mongodb+srv://mubeen:1q2w3e4r@cluster0.3l7cbss.mongodb.net")
  .then(() => {
    return console.info("Successfully connected to Database");
  });
app.listen(PORT, () => {
  console.log("server listening on http://localhost:8000");
});

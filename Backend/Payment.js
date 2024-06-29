const User = require("./Model/User");
const express = require("express");
const PRODUCT = require("./Model/Product");
const app = express();
const stripe = require("stripe")(
  "sk_test_51PWcHdF8JrqSkfOZEcEQJTlGI18r7EvmXIBwfNFJIqrlpUPGjc6xa8zRlYG1EdUT8Nkbn7hA9o4sIpZiegYBNknr00zhj44VoR"
);

app.use(express.json());

exports.createStripePayment = async (req, res) => {
  try {
    // Fetch the latest user data with updated cart
    const userData = await User.findById(req.user.id).exec();
    if (!userData) {
      return res
        .status(404)
        .json({ status: "Failure", message: "User not found" });
    }

    const carts = userData.cartdata;
    const itemIds = Object.keys(carts)
      .filter((id) => carts[id] > 0)
      .map((id) => parseInt(id));
    const products = await PRODUCT.find({ ItemId: { $in: itemIds } }).exec();

    if (products.length === 0) {
      return res.status(404).json({
        status: "Failure",
        message: "No valid products found in cart",
      });
    }

    let totalAmount = 0;
    const stripeProducts = await Promise.all(
      products.map(async (product) => {
        const quantity = carts[product.ItemId];
        if (!quantity) return null;

        // Increment total amount
        totalAmount += product.rentalPrice * quantity;

        const stripeProduct = await stripe.products.create({
          name: product.name,
          description: product.description,
          images: [product.image],
          metadata: {
            category: product.category,
            color: product.color,
            ItemId: product.ItemId,
            rentalPrice: product.rentalPrice,
          },
        });

        const price = await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: product.rentalPrice * 100, // Convert to cents
          currency: "inr",
        });

        return {
          price: price.id,
          quantity,
        };
      })
    );

    const validStripeProducts = stripeProducts.filter((p) => p !== null);
    if (validStripeProducts.length === 0) {
      return res.status(400).json({
        status: "Failure",
        message: "No valid items for Stripe session",
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: validStripeProducts,
      mode: "payment",
      success_url: "http://localhost:5173/payment/success",
      cancel_url: "http://localhost:5173/payment/cancel",
      customer_email: req.user.email,
    });

    res.json(session);
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

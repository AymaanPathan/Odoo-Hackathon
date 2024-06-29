const express = require("express");
const PRODUCT = require("../Model/Product");
const User = require("../Model/User");
const app = express();

app.use(express.json());

// Add Product

exports.AddProduct = async (req, res) => {
  try {
    const {
      ItemId,
      name,
      category,
      image,
      color,
      description,
      availability,
      rentalPrice,
      rentalDurationOptions,
      material,
      weight,
      stockQuantity,
      location,
    } = req.body;

    // Validate input data
    if (
      !ItemId ||
      !name ||
      !category ||
      !image ||
      !color ||
      !description ||
      rentalPrice == null ||
      !material ||
      weight == null ||
      !location
    ) {
      return res.status(400).json({
        status: "Error",
        message: "All fields are required.",
      });
    }

    // Create product
    const item = await PRODUCT.create({
      ItemId: parseInt(ItemId),
      name,
      category,
      image,
      color,
      description,
      availability: Boolean(availability),
      rentalPrice: parseFloat(rentalPrice),
      rentalDurationOptions: rentalDurationOptions?.map((opt) =>
        parseInt(opt, 10)
      ),
      material,
      weight: parseFloat(weight),
      stockQuantity: parseInt(stockQuantity, 10),
      location,
    });

    res.status(200).json({
      status: "Success",
      product: item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Failed to add product.",
    });
  }
};

// Remove Product
exports.DeleteProduct = async (req, res) => {
  try {
    const { ItemId } = req.body;

    if (!ItemId) {
      return res.status(400).json({
        status: "Error",
        message: "ItemId is required.",
      });
    }

    const product = await PRODUCT.findOneAndDelete({ ItemId });

    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Product not found.",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Failed to delete product.",
    });
  }
};

exports.GetAllProducts = async (req, res) => {
  try {
    const products = await PRODUCT.find();

    res.status(200).json({
      status: "Success",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve products.",
    });
  }
};

// ProductController.js or ProductModule.js
exports.GetOneProduct = async (req, res) => {
  try {
    let query = await PRODUCT.findOne({ ItemId: Number(req.params.id) });
    res.json(query);
  } catch (error) {
    console.log(error);
  }
};

exports.AddToCart = async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Initialize cartdata if it's undefined (this is optional based on your app logic)
    if (!userData.cartdata) {
      userData.cartdata = {};
    }

    // Increment or initialize ItemId count
    userData.cartdata[req.body.ItemId] =
      (userData.cartdata[req.body.ItemId] || 0) + 1;

    // Save updated cartdata to the user document
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartdata: userData.cartdata }
    );

    // Respond with the updated cartdata
    res.json(userData.cartdata);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove From cart
exports.RemoveFromCart = async (req, res) => {
  let UserData = await User.findOne({ _id: req.user.id });
  UserData.cartdata[req.body.ItemId] -= 1;

  if (UserData.cartdata[req.body.ItemId] <= 0) {
    UserData.cartdata[req.body.ItemId] = 0;
  }
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartdata: UserData.cartdata }
  );
  res.json(UserData.cartdata);
};

// Get Cart
exports.GetCart = async (req, res) => {
  try {
    // Find the user by ID
    const userData = await User.findOne({ _id: req.user.id });
    if (!userData) {
      return res.status(404).json({
        status: "Failure",
        message: "User not found",
      });
    }

    res.json({
      status: "Success",
      data: userData.cartdata,
    });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({
      status: "Error",
      message: "An error occurred while fetching cart data",
    });
  }
};

exports.EmptyCart = async (req, res) => {
  let cart = {};
  for (let i = 1; i <= 300; i++) {
    cart[i] = 0;
  }
  try {
    // Empty the cart using findOneAndUpdate
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { cartdata: cart } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "User Not Found",
      });
    }

    // Send a success response with the updated cart data
    res.status(200).json({
      status: "success",
      message: "Cart is now empty",
      data: updatedUser.cartdata,
    });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error emptying cart:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to empty cart",
    });
  }
};

// Wishlist
exports.AddWishlist = async (req, res) => {
  try {
    const { _id } = req.body;
    const userData = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $addToSet: { Wishlist: _id } },
      { new: true }
    );
    res.json(userData);
  } catch (error) {
    console.log(error);
  }
};

exports.RemoveWishlist = async (req, res) => {
  try {
    const { _id } = req.body;

    const userData = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { Wishlist: _id } },
      { new: true }
    );

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.GetWishlist = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      res.status(401).json({
        Status: "Failed",
        Message: "User Not found",
      });
    }
    const UserData = await User.findById(user);
    const UserWishlist = UserData.Wishlist;

    const Items = await PRODUCT.find({ _id: { $in: UserWishlist } });

    res.status(200).json({
      Status: "Success",
      Data: Items,
    });
  } catch (err) {
    console.log(err);
  }
};

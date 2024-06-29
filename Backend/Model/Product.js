const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ItemId: {
      type: Number,
      unique: [true, "ItemId Must be Unique"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    rentalPrice: {
      type: Number,
      required: true,
    },
    rentalDurationOptions: {
      type: [Number],
      default: [6, 12, 18],
    },
    material: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      default: 1,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

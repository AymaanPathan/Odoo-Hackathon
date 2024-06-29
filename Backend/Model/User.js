const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cartdata: {
    type: Object,
  },
  Wishlist: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Product",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

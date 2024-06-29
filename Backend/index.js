const express = require("express");
const mongoose = require("mongoose");
const Payment = require("./Payment");
const Auth = require("./Auth/Auth");
const cors = require("cors");
const Product = require("../Backend/Product/Product");
const { upload, uploadFile } = require("./UploadImage/upload"); // Import upload and handler
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(express.json());

const port = 8080;

// MongoDb Connection
const connectDb = async () => {
  try {
    const response = await mongoose.connect(
      "mongodb+srv://aymaan:1234@cluster0.rv9jdh7.mongodb.net/ecommerce",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
      }
    );
    console.log("Connected To DataBase⭐");
  } catch (error) {
    console.log("Error in Mongo", error);
  }
};
connectDb();

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routing
const Router = express.Router();

// Images
Router.post("/upload", upload.single("productImage"), uploadFile);

// Auth
Router.post("/register", Auth.Register);
Router.post("/login", Auth.Login);
Router.put("/profile/update/Email", Auth.protect, Auth.updateEmail);
Router.put("/profile/update/Password", Auth.protect, Auth.updatePassword);

// Product
Router.get("/all-products", Product.GetAllProducts);
Router.post("/Addproduct", Product.AddProduct);
Router.delete("/delete-product", Product.DeleteProduct);
Router.get("/product/:id", Product.GetOneProduct);
Router.post("/AddToCart", Auth.protect, Product.AddToCart);
Router.post("/RemoveFromCart", Auth.protect, Product.RemoveFromCart);
Router.post("/GetCart", Auth.protect, Product.GetCart);
Router.post("/EmptyCart", Auth.protect, Product.EmptyCart);

// Wishlist
Router.get("/GetWishlist", Auth.protect, Product.GetWishlist);
Router.post("/AddWishlist", Auth.protect, Product.AddWishlist);
Router.post("/RemoveWishlist", Auth.protect, Product.RemoveWishlist);

// Paymeny
Router.post("/payment", Auth.protect, Payment.createStripePayment);

// Route to get all
app.use(Router);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server Started 🟢`);
});

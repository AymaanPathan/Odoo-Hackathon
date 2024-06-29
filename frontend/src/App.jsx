import "./index.css";
import Layout from "./Components/Layout.jsx";
import Shop from "./Components/Shop/Shop.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import { Toaster } from "react-hot-toast";

import { Route, Routes } from "react-router-dom";
import WishList from "./Components/Wishlist/WishList.jsx";
import ProductList from "./Components/AdminPanel/ProductList.jsx";
import MainContent from "./Components/AdminPanel/MainContent.jsx";
import CategoryMain from "./Components/ProductCategory/CategoryMain.jsx";
import Shopping from "./Components/Shopping/Shopping.jsx";
import Product from "./Components/Product/Product.jsx";
import AdminPanel from "./Components/AdminPanel/AdminPanel.jsx";
import CartItem from "./Components/Cart-Items/CartItem.jsx";
import SuccessPage from "./Components/Cart-Items/Success.jsx";
import CancelPage from "./Components/Cart-Items/Cancel.jsx";
import UpdateEmail from "./Components/UpdateUserInfo/Email.jsx";
import ChangePassword from "./Components/UpdateUserInfo/Password.jsx";

export default function App() {
  return (
    <main>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Shop />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/shop" element={<Shopping />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/:ItemID" element={<Product />} />
          <Route path="/cartItems" element={<CartItem />} />
          <Route path="/shop/:name" element={<CategoryMain />} />
          <Route path="/admin/addProduct" element={<MainContent />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/payment/success" element={<SuccessPage />} />
          <Route path="/payment/cancel" element={<CancelPage />} />
          <Route path="/profile/update/Email" element={<UpdateEmail />} />
          <Route path="/profile/update/Password" element={<ChangePassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </main>
  );
}

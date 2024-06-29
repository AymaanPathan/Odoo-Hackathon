/* eslint-disable react-hooks/exhaustive-deps */
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { Productcontext } from "../../Context/Product";
import FancyBox from "./FancyBox";
import close from "./close.png";
import "./cart.css";

function CartItem() {
  const { cartItem, setCartItem, RemovefromCart, products, emptyCart } =
    useContext(Productcontext);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const GetCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:8080/GetCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const result = await response.json();
        setCartItem(result.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCart();
  }, [cartItem]);

  // Calculate the total price of items in the cart
  const price = products
    .reduce(
      (total, product) =>
        total + (cartItem[product.ItemId] || 0) * product.rentalPrice,
      0
    )
    .toFixed(2);

  const handleRemove = (productId) => {
    RemovefromCart(productId);
    toast.success("Item Removed");
  };

  if (loading) {
    return <div className="text-center my-8">Loading cart...</div>;
  }

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url; // Redirects to Stripe Checkout URL
        console.log(data);
      } else {
        console.error("Payment initiation failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {!loggedIn && <FancyBox />}
      <div className={`container mx-auto px-4 ${!loggedIn ? "blur-sm" : ""}`}>
        <h1 className="text-center text-4xl font-light text-gray-400 tracking-wide mt-6 mb-2">
          Shopping Bag
        </h1>
        {products.length > 0 && Object.keys(cartItem).length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              {products.map((product) => {
                if (cartItem[product.ItemId] > 0) {
                  return (
                    <div
                      key={product.ItemId}
                      className="cart-item bg-white rounded-lg shadow-md p-6 mb-4 flex items-center"
                    >
                      <img
                        className="h-24 w-24 mr-4 rounded-lg"
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="flex flex-col">
                        <div className="cart-product-head-div">
                          <h3 className="lg:text-xl cart-product-name text-sm font-semibold mb-2">
                            {product.name}
                          </h3>
                          <img
                            src={close}
                            alt="close-img"
                            onClick={() => handleRemove(product.ItemId)}
                            className="close-img w-4 h-4  cursor-pointer cart-close-img"
                          />
                        </div>
                        <p className="text-gray-600 mb-2">
                          Price: ₹{product.rentalPrice}
                        </p>
                        <div className="mb-2">
                          <span className="text-xl font-light">
                            Quantity: {cartItem[product.ItemId]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg mb-4 font-light text-black">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span className="font-light text-black">Subtotal</span>
                  <span>₹{price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-light text-black">Taxes</span>
                  <span>₹190</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-light text-black">Shipping</span>
                  <span>Free</span>
                </div>
                <hr className="my-2 w-full" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    ₹{price > 0 ? (parseFloat(price) + 190).toFixed(2) : 0}
                  </span>
                </div>
                <button
                  onClick={handlePayment}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                >
                  Checkout
                </button>
                <button
                  onClick={emptyCart}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                >
                  Empty Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center my-8">Your shopping bag is empty.</div>
        )}
      </div>
    </>
  );
}

export default CartItem;

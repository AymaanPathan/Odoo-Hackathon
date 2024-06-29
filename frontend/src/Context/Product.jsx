/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const Productcontext = createContext(null);

const ProductcontextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/all-products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const DeleteProduct = async (ItemId) => {
    try {
      const response = await fetch("http://localhost:8080/delete-product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ItemId: ItemId }),
      });
      const data = await response.json();
      toast.success("Product Successfully Deleted");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ---> Here Frontend  Will Remove Items
  const RemovefromCart = (ItemId) => {
    setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] || 0 - 1 }));
    if (localStorage.getItem("token")) {
      fetch("http://localhost:8080/RemovefromCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          token: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ItemId: ItemId }),
      });
    }
  };

  const GetCart = async () => {
    let token = localStorage.getItem("token");
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

        const data = await response.json();
        setCartItem(data); // Assuming setCartItem updates your cart items in context
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
  };

  const emptyCart = async () => {
    let token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/EmptyCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    console.log(response);
  };

  return (
    <Productcontext.Provider
      value={{
        DeleteProduct,
        handleSmoothScroll,
        cartItem,
        RemovefromCart,
        setCartItem,
        emptyCart,
        products,
        setProducts,
        fetchProducts,
        GetCart,
      }}
    >
      {props.children}
    </Productcontext.Provider>
  );
};

export default ProductcontextProvider;

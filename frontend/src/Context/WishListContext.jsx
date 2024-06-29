/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const WishListcontext = createContext({
  wishlist: [],
  AddWishlist: () => {},
  RemoveWishlist: () => {},
  Items: [],
});

export const WishListContextProvider = (props) => {
  const [wishlist, setWishlist] = useState([]);
  const [Items, setItems] = useState([]);

  // Fetch
  const token = localStorage.getItem("token");
  const fetchWishlist = async () => {
    const response = await fetch("http://localhost:8080/GetWishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    const data = await response.json();
    return setItems(data.Data);
  };

  console.log(Items);

  const addWishlist = (itemId) => {
    if (!wishlist.includes(itemId)) {
      toast.success("Item Added To Wishlist");
      setWishlist([...wishlist, itemId]);
    }
  };

  const removeWishlist = (itemId) => {
    const newWishList = wishlist.filter((item) => item != itemId);
    toast.error("Item Removed From Wishlist");
    return setWishlist(newWishList);
  };

  // 1. Add Wishlist
  const AddWishlist = async (_id) => {
    const response = await fetch("http://localhost:8080/AddWishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ _id }),
    });
    const data = await response.json();
    toast.success("Item Added To Your Wishlist", {
      style: {
        background: "white",
        color: "#000",
        border: "none",
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        padding: "12px",
        minWidth: "200px",
      },
    });
    return setWishlist(data.Data);
  };

  //2. Remove Wishlist
  const RemoveWishlist = async (_id) => {
    const response = await fetch("http://localhost:8080/RemoveWishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ _id }),
    });
    const data = await response.json();
    setWishlist(data.Data);
    toast.success("Item Removed From Your Wishlist", {
      style: {
        background: "white",
        color: "#000",
        border: "none",
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        padding: "12px",
        minWidth: "200px",
      },
    });
  };

  return (
    <WishListcontext.Provider
      value={{
        Items,
        fetchWishlist,
        AddWishlist,
        RemoveWishlist,
        wishlist,
        setWishlist,
        addWishlist,
        removeWishlist,
      }}
    >
      {props.children}
    </WishListcontext.Provider>
  );
};

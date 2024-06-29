/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from "react";
import { WishListcontext } from "../../Context/WishListContext";
import { Link } from "react-router-dom";
import "./wishlist.css";
import emptyWishlist from "./marketing.png";
import closeImg from "./close.png";

export default function WishListItems() {
  const { RemoveWishlist, fetchWishlist, Items } = useContext(WishListcontext);

  useEffect(() => {
    fetchWishlist();
  }, [Items]);

  console.log(Items);

  if (!Items || Items.length === 0) {
    return (
      <>
        <h1 className="text-center text-2xl mt-4 font-bold text-gray-400 font-playfair-display tracking-wide">
          Explore Your Wishlists
        </h1>
        <div className="empty-wishlist">
          <img
            src={emptyWishlist}
            alt="Empty Wishlist"
            className="wishlist-img"
          />
          <h2 className="text-2xl font-semibold mb-6">
            Your Wishlist is Empty
          </h2>
          <p className="text-lg text-gray-500 mb-6 w-96">
            Looks like you haven't added anything to your wishlist yet. Explore
            our products and add items to your wishlist.
          </p>
          <Link to="/">
            <button className="py-3 px-6 bg-[#7F493F] text-white rounded-lg hover:bg-[#5a342d] duration-200">
              Start Shopping
            </button>
          </Link>
        </div>
      </>
    );
  }

  // If Items has data, render the wishlist items
  return (
    <>
      <h1 className="text-center text-2xl mt-4 font-bold text-gray-400 font-playfair-display tracking-wide">
        Explore Your Wishlists
      </h1>
      <div className="wishlist-container">
        {Items.map((item) => (
          <div
            key={item.id}
            className="wishlist-item h-fit overflow-hidden transform transition-transform relative"
          >
            <img
              className="wishlist-img object-cover"
              src={item.image}
              alt={item.name}
            />
            <Link to={`/${item.ItemId}`}>
              <button className="w-full h-full py-2 rounded-b-lg text-white bg-yellow-900 hover:bg-yellow-700 duration-100">
                Visit Product
              </button>
            </Link>
            <img
              src={closeImg}
              alt="Cross Img"
              onClick={() => RemoveWishlist(item._id)}
              className="cursor-pointer w-3 h-3 cross-icon text-xl absolute text-black top-1 right-1 far fa-times-circle"
            />
            <div className="wishlist-badge absolute top-2 left-2 text-white text-xs px-2 py-1 rounded">
              Your Wishlist
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

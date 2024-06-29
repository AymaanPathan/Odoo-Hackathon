import { useContext, useEffect, useState } from "react";
import { Productcontext } from "../../Context/Product";
import { Link } from "react-router-dom";
import { navs } from "./Data";
import star from "./star.png";
import "./best.css";
import { WishListcontext } from "../../Context/WishListContext";

export default function Best() {
  const { products, handleSmoothScroll } = useContext(Productcontext);
  const { AddWishlist, Items } = useContext(WishListcontext);
  const [filter, setFilters] = useState("Dining Room");
  const [active, setActive] = useState(0);
  const [showProducts, setShowProducts] = useState([]);

  const handleClick = (e, index) => {
    setFilters(e.target.textContent);
    setActive(index);
  };

  const addToWishlist = (id) => {
    AddWishlist(id);
  };

  useEffect(() => {
    const items = products
      .filter((item) => item.category === filter)
      .slice(0, 3);
    setShowProducts(items);
  }, [products, filter]);

  const isInWishlist = (id) => Items.includes(id);

  return (
    <div className="best-container mt-24 p-8">
      <div className="mb-12 text-center">
        <span className="text-gray-600 text-lg font-bold uppercase tracking-wide">
          Our Products
        </span>
        <p
          className="text-3xl text-[#1B2834] font-semibold mt-2"
          id="OurProducts"
        >
          Our Bestselling Products
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-center gap-4 mb-10">
          {navs.map((navItem, index) => (
            <span
              key={index}
              className={`${
                active === index
                  ? "font-bold text-white bg-[#7F493F] rounded-md py-2 px-4 shadow-md transition-colors duration-300"
                  : "text-gray-700 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
              } cursor-pointer select-none text-lg`}
              onClick={(e) => handleClick(e, index)}
            >
              {navItem.Name}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {showProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl max-w-sm"
            >
              <div className="relative">
                <i
                  onClick={() => addToWishlist(item._id)}
                  className={`absolute top-4 right-4 text-xl cursor-pointer ${
                    isInWishlist(item._id)
                      ? "fa-solid fa-heart text-pink-500"
                      : "far fa-heart"
                  }`}
                ></i>
                <p className="absolute top-4 left-4 py-1 px-3 text-sm text-[#38988F] font-semibold bg-white rounded-md shadow-md">
                  25% OFF
                </p>
                <Link onClick={handleSmoothScroll} to={`/${item.ItemId}`}>
                  <img
                    src={item.image}
                    className="w-72 h-72 object-cover"
                    alt={item.name}
                  />
                </Link>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.Title}</h3>
                <p className="mt-1 text-xl text-[#1B2834] font-bold">
                  {item.name}
                </p>
                <div className="flex items-center text-sm mt-2 gap-4">
                  <p className="text-gray-500 font-bold">{item.company}</p>
                  <div className="flex items-center gap-1">
                    <img src={star} className="w-4 h-4" alt="star" />
                    <p>4.0</p>
                  </div>
                </div>
                <div className="flex items-center mt-2 text-lg font-bold gap-4">
                  <p className="text-[#7F493F]">Rs. {item.rentalPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

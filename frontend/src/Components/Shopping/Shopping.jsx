/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Shopping() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [searchQuery, sortOption, selectedColor, selectedLocation, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/all-products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterAndSortProducts = () => {
    let updatedProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedColor ? product.color === selectedColor : true) &&
        (selectedLocation ? product.location === selectedLocation : true)
    );

    if (sortOption === "high-to-low") {
      updatedProducts = updatedProducts.sort(
        (a, b) => b.rentalPrice - a.rentalPrice
      );
    } else if (sortOption === "low-to-high") {
      updatedProducts = updatedProducts.sort(
        (a, b) => a.rentalPrice - b.rentalPrice
      );
    } else if (sortOption === "popularity") {
      updatedProducts = updatedProducts.sort(
        (a, b) => b.popularity - a.popularity
      );
    }

    setFilteredProducts(updatedProducts);
  };

  const renderRentalDurationOptions = (options) =>
    options.map((option, index) => (
      <span
        key={index}
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >
        {Number.isInteger(option) ? `${option} days` : option}
      </span>
    ));

  const uniqueColors = [...new Set(products.map((product) => product.color))];
  const uniqueLocations = [
    ...new Set(products.map((product) => product.location)),
  ];

  return (
    <div className="mx-auto p-6 max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6 text-[#4A3F35]">
        Explore Our Furniture Collection
      </h1>
      <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 bg-[#F7F2E9] text-[#4A3F35]"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 bg-[#F7F2E9] text-[#4A3F35]"
          >
            <option value="">Sort By</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="popularity">Popularity</option>
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 bg-[#F7F2E9] text-[#4A3F35]"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedColor("")}
            className={`border rounded-full w-8 h-8 ${
              selectedColor === ""
                ? "bg-[#8B4513] text-white"
                : "bg-[#D2B48C] text-[#4A3F35]"
            }`}
          >
            All
          </button>
          {uniqueColors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`border rounded-full w-8 h-8 ${
                selectedColor === color
                  ? "bg-[#8B4513] text-white"
                  : `bg-${color}-500 text-white`
              }`}
              style={{
                backgroundColor: color,
                color:
                  color.toLowerCase() === "white" ||
                  color.toLowerCase() === "cream"
                    ? "black"
                    : "white",
                border:
                  color.toLowerCase() === "white" ||
                  color.toLowerCase() === "cream"
                    ? "1px solid black"
                    : "none",
              }}
            >
              {/* Remove color name from the button */}
            </button>
          ))}
        </div>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg overflow-hidden shadow-md bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-[#4A3F35]">
                  {product.name}
                </h2>
                <p className="text-[#4A3F35] mb-2">
                  Rental Price: ₹{product.rentalPrice}
                </p>
                <p className="text-[#4A3F35] mb-2">
                  Rental Duration Options:{" "}
                  {renderRentalDurationOptions(product.rentalDurationOptions)}
                </p>
                <p className="text-[#4A3F35] mb-2">Color: {product.color}</p>
                <p className="text-[#4A3F35] mb-2">
                  Location: {product.location}
                </p>
                <p className="text-[#4A3F35] mb-2">Style: {product.style}</p>
                <Link to={`/${product.ItemId}`}>
                  <button className="bg-[#8B4513] hover:brightness-125 duration-100 text-white py-2 px-4 rounded-full mt-4 focus:outline-none">
                    Show Product
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

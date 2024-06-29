import { useContext } from "react";
import { FilteredItems } from "../../Context/FilteredItems";

export default function Colors() {
  const { setSelectedColors, selectedColors } = useContext(FilteredItems);
  const colors = ["black", "brown", "white", "cream", "gray", "All"];

  const handleColorClick = (color) => {
    setSelectedColors(color);
  };

  return (
    <div>
      <p className="text-gray-600 font-semibold font-playfair-display text-lg mb-2">
        Colors
      </p>
      <div className="flex gap-4 mt-4">
        {colors.map((color) => (
          <span
            key={color}
            onClick={() => handleColorClick(color)}
            className={`inline-block transition-all duration-200 ease-in-out transform ${
              selectedColors === color
                ? "scale-125 shadow-2xl  border-gray-600"
                : ""
            } cursor-pointer w-4 h-4  rounded-full border border-gray-600 ${
              color === "black"
                ? "bg-black"
                : color === "brown"
                ? "bg-yellow-800"
                : color === "white"
                ? "bg-white "
                : color === "cream"
                ? "bg-orange-200"
                : color === "gray"
                ? "bg-gray-600"
                : "bg-gradient-to-t from-yellow-600 via-green-200 to-red-200"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}

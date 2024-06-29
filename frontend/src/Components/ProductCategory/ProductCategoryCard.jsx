/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Productcontext } from "../../Context/Product";
import { Link } from "react-router-dom";
import { FilteredItems } from "../../Context/FilteredItems";

export default function ProductCategoryCard({ category, selectedItems }) {
  const { products } = useContext(Productcontext);
  const { selectedColors } = useContext(FilteredItems);

  const newFilteredItems = products.filter((item) => {
    const itemMatchesSelected =
      selectedItems === "All" ||
      item.name.toLowerCase().includes(selectedItems.toLowerCase());
    const colorMatchesSelected =
      selectedColors === "All" ||
      item.color.toLowerCase() === selectedColors.toLowerCase();
    return itemMatchesSelected && colorMatchesSelected;
  });

  return (
    <div className="flex flex-wrap gap-6 justify-center p-4">
      {newFilteredItems.map((item, i) =>
        item.name.toLowerCase().includes(category.toLowerCase()) ? (
          <div
            key={i}
            className="max-w-xs p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/${item.ItemId}`} className="block">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </Link>
            <div className="p-2">
              <span className="block mt-2 text-center text-lg font-semibold text-gray-800">
                {item.name}
              </span>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

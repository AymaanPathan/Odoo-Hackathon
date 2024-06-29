/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState } from "react";
export const FilteredItems = createContext(null);

const FilteredItemsProvider = (props) => {
  const [selectedItems, setSelectedItems] = useState("All");
  const [selectedColors, setSelectedColors] = useState("All");
  const category = [
    "jeans",
    "Jacket",
    "Shirt",
    "T-shirt",
    "Sweatshirt",
    "Panty",
    "Shorts",
    "Dress",
    "All",
  ];

  return (
    <FilteredItems.Provider
      value={{
        category,
        selectedColors,
        setSelectedColors,
        selectedItems,
        setSelectedItems,
      }}
    >
      {props.children}
    </FilteredItems.Provider>
  );
};

export default FilteredItemsProvider;

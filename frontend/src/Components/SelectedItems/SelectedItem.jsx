import { useState, useContext } from "react";
import { FilteredItems } from "../../Context/FilteredItems";
import Colors from "./Colors";
// import Colors from "./Colors";

export default function SelectedItem() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedItems, setSelectedItems, category } =
    useContext(FilteredItems);

  return (
    <>
      <div className="lg:w-1/4 w-full mb-8 lg:mb-0 lg:mr-14">
        <h2 className="font-bold text-lg mb-2 font-playfair-display">
          Filters
        </h2>
        <hr className="mb-6" />
        <Colors />
      </div>
      <hr
        className={`transition-opacity duration-500 mt-4 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <hr className={`transition-opacity duration-500 mt-4`} />
    </>
  );
}

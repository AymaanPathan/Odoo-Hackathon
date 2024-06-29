import { useParams } from "react-router-dom";
import ProductCategoryCard from "./ProductCategoryCard";
import { useContext } from "react";
import { FilteredItems } from "../../Context/FilteredItems";
import SelectedItem from "../SelectedItems/SelectedItem";

export default function CategoryMain() {
  const { name } = useParams();
  const { selectedItems } = useContext(FilteredItems);

  return (
    <div className="p-8 flex flex-col lg:flex-row lg:justify-between">
      <SelectedItem />
      <div className="flex-1">
        <ProductCategoryCard category={name} selectedItems={selectedItems} />
      </div>
    </div>
  );
}

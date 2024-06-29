import CategoryCard from "./CategoryCard";
import "./category.css";
import Diningpng from "./Dining.png";
import Reclinerspng from "./Recliners.png";
import Sofapng from "./Sofa.png";

export default function Category() {
  return (
    <div className="category-grid flex  justify-center mt-24">
      <CategoryCard img={Diningpng} name="Sofa" />
      <CategoryCard img={Reclinerspng} name="Recliners" />
      <CategoryCard img={Sofapng} name="Sofa" />
    </div>
  );
}

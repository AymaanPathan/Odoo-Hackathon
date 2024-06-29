/* eslint-disable react/prop-types */
import "./category.css";

export default function CategoryCard({ img, name }) {
  return (
    <div className="category-card relative p-4 w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105">
      <img className="rounded-md w-full h-auto" src={img} alt={name} />
      <p className="font-playfair-display mt-2 text-center">{name}</p>
    </div>
  );
}

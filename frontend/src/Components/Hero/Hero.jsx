import "./hero.css";
import discount from "./discount.png";
import { Link } from "react-router-dom";
import background from "./hero.png";
import "./Services";

function Hero() {
  return (
    <div className="main_hero bg-[#F5F8FA] flex px-8">
      {/* Left */}
      <div className="left flex flex-col p-16  gap-11">
        <div className="discount-main flex items-center gap-3 cursor-pointer w-fit py-2 px-4 rounded-xl bg-white">
          <img className="w-6 h-6" src={discount} alt="discount" /> Enjoy 50%
          <p className="text-[#1B2834]">OFF in Our Summer Super Sale!</p>
        </div>
        <p className="hero-heading-text font-bold text-[#1B2834] text-4xl">
          Discover the Joy of Renting: Designer Furniture, No Commitments!
        </p>
        <span className="hero-subtitle text-gray-400">
          Enjoy stylish and comfortable furniture without the long-term
          commitment. Affordable rates, easy delivery, and hassle-free returns
          make it simple to refresh your space.
        </span>
        <button className="hero-btn bg-[#7F493F] inline-flex items-center gap-2 font-semibold w-fit text-white py-2 px-6 rounded-md">
          <Link to="/shop">Shop now</Link>
          <i className="fas fa-arrow-right hover:translate-x-1 duration-150 text-xl "></i>
        </button>
      </div>

      {/* Right */}
      <div className="right">
        <img className=" h-full w-[90rem]" src={background} alt="" />
      </div>
    </div>
  );
}

export default Hero;

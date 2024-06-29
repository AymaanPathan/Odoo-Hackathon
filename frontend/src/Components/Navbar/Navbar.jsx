import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./hanger.png";
import DropDown from "./DropDown/DropDown";
import SearchDropDown from "./DropDown/SearchDropDown";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setSearchDropdownOpen(false);
  };

  const toggleSearchDropdown = () => {
    setSearchDropdownOpen((prev) => !prev);
    setDropdownOpen(false);
  };

  return (
    <div className="nav__main flex lg:flex-row flex-col items-center gap-12 justify-between px-8 py-4 bg-white border-b-2 relative">
      <i
        className={`fas ${
          menuOpen ? "fa-times" : "fa-bars"
        } absolute right-6 top-6 md:hidden cursor-pointer`}
        onClick={toggleMenu}
        role="button"
        aria-label="Toggle menu"
      ></i>

      <div className="header-logo ml-4 flex items-center gap-4 cursor-pointer whitespace-nowrap">
        <Link to="/">
          <img className="w-full h-8" src={logo} alt="Devine Vogue Logo" />
        </Link>
        <Link to="/">Devine Vogue</Link>
      </div>

      <ul
        className={`nav__menu ${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center gap-8 whitespace-nowrap text-gray-400 cursor-pointer`}
      >
        <li className="hover:text-black">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-black">
          <Link to="/shop">Shop</Link>
        </li>
        <li className="hover:text-black">
          <Link to="/shop/chair">chair</Link>
        </li>
        <li className="hover:text-black">
          <Link to="/shop/table">Table</Link>
        </li>
        <li className="hover:text-black">
          <Link to="/wishlist" className="heart  ">
            Wishlist
          </Link>
        </li>
      </ul>

      <div className="md:flex-row items-center nav__list-icon flex w-48 gap-8 text-xl relative">
        <Link to="/cartItems">
          <i
            className="bx bx-shopping-bag cursor-pointer"
            role="button"
            aria-label="Cart"
          >
            <span className="text-sm py-[4px] px-[4px] text-[#7F493F] font-bold rounded-lg text-center relative bottom-2 right-1">
              {/* {cartCount()} */}
            </span>
          </i>
        </Link>
        <i
          className="bx bx-user cursor-pointer"
          onClick={toggleDropdown}
          role="button"
          aria-label="User"
        ></i>
        {dropdownOpen && <DropDown />}
      </div>
    </div>
  );
}

export default Navbar;

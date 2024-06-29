import { useState } from "react";
import "./dropdown.css";

export default function SearchDropDown() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Add your search logic here
  };

  return (
    <div className="absolute search-dropdown-container">
      <div className="searchDropDownProfile  flex flex-col">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

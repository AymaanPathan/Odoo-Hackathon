import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-gray-800 text-white flex-shrink-0 min-h-[34rem]">
      <div className="w-64 h-full">
        <div className="p-4">
          <h2 className="text-xl text-center font-semibold">Admin Panel</h2>
          <ul className="mt-4">
            <li className="py-2 text-center hover:bg-gray-700 cursor-pointer">
              <Link to="/admin/addProduct">Add Product</Link>
            </li>
            <li className="py-2 text-center hover:bg-gray-700 cursor-pointer">
              <Link to="/admin/products">Products List</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

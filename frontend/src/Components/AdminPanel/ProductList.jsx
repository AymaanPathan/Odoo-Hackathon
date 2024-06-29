import { useContext } from "react";
import { Productcontext } from "../../Context/Product";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

function ProductList() {
  const { products, DeleteProduct } = useContext(Productcontext);
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 flex-1">
        <h2 className="text-3xl font-semibold mb-8 text-center text-indigo-600">
          Products List
        </h2>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white  rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold mb-2">{product.name}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 line-through">
                      Rs.{product.oldPrice}
                    </span>
                    <span className="text-indigo-600 font-bold">
                      Rs.{product.newPrice}
                    </span>
                    <button
                      onClick={() => DeleteProduct(product.ItemId)}
                      className="bg-red-600 text-white px-2 py-2 hover:brightness-110 duration-150 text-xs rounded-md mr-2"
                    >
                      Remove Product
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/admin/addProduct"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductList;

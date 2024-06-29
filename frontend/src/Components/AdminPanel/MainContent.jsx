import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { Productcontext } from "../../Context/Product";
import Sidebar from "./Sidebar";
import "./adminPanel.css";

export default function MainContent() {
  const [ItemId, setItemId] = useState(0);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("Select image");
  const [availability, setAvailability] = useState(true); // Default value for availability
  const [rentalPrice, setRentalPrice] = useState(0);
  const [rentalDurationOptions, setRentalDurationOptions] = useState([
    6, 12, 18,
  ]); // Default rental durations
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState();
  const [stockQuantity, setStockQuantity] = useState(1); // Default stock quantity
  const [location, setLocation] = useState("");

  const { fetchProducts } = useContext(Productcontext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name || "Select image");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("productImage", file);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.image_url);
        console.log("File uploaded:", data);
        alert("File uploaded successfully");
      } else {
        console.error("Upload failed:", response.statusText);
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const handleAddProduct = async () => {
    // Validate all necessary fields
    if (
      !ItemId ||
      ItemId <= 0 ||
      !productName ||
      !productCategory ||
      !imageUrl ||
      !productDescription ||
      !color ||
      rentalPrice == null ||
      !material ||
      weight == null ||
      !location
    ) {
      toast.error("All fields are required and must be valid.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/AddProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ItemId: parseInt(ItemId, 10),
          name: productName,
          image: imageUrl,
          category: productCategory,
          description: productDescription,
          color: color,
          availability: Boolean(availability),
          rentalPrice: parseFloat(rentalPrice),
          rentalDurationOptions: rentalDurationOptions.map((opt) =>
            parseInt(opt, 10)
          ),
          material,
          weight: parseFloat(weight),
          stockQuantity: parseInt(stockQuantity, 10),
          location,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${response.statusText}`);
        console.error(`Details: ${errorText}`);
        throw new Error("Failed to add product.");
      }

      const result = await response.json();
      toast.success(`Product ${result.product.name} added successfully!`);
      fetchProducts(); // Fetch updated list of products
      resetForm(); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  const resetForm = () => {
    setItemId(0);
    setProductName("");
    setProductCategory("");
    setProductDescription("");
    setColor("");
    setFile(null);
    setFileName("Select image");
    setAvailability(true);
    setRentalPrice("");
    setRentalDurationOptions([6, 12, 18]);
    setMaterial("");
    setWeight("");
    setStockQuantity(1);
    setLocation("");
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  return (
    <div className="flex mx-auto w-full bg-white rounded-lg shadow-md">
      <Sidebar />

      {/* Form Container */}
      <div className="flex-1 px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="itemId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Item ID
            </label>
            <input
              value={ItemId}
              onChange={(e) => setItemId(e.target.value)}
              type="number"
              id="itemId"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter item ID..."
            />
          </div>

          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              id="productName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product name..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Category
            </label>
            <input
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              type="text"
              id="productCategory"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product category..."
            />
          </div>

          <label
            htmlFor="productImage"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image
          </label>
          <div className="flex h-12 gap-12 items-center">
            <div className="flex items-center space-x-4">
              <label
                htmlFor="productImage"
                className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer bg-white text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {fileName}
              </label>
              <input
                onChange={handleFileChange}
                type="file"
                id="productImage"
                name="productImage"
                className="hidden"
              />
              <button
                onClick={handleUpload}
                type="button"
                className="bg-indigo-600 py-2 px-6 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload
              </button>
            </div>
          </div>
          {imageUrl && (
            <div className="">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-12 h-12 rounded-lg"
              />
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="productDescription"
            className=" text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            id="productDescription"
            className="text-area w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product description..."
            rows="2"
          ></textarea>
        </div>

        <div className="flex gap-8 items-center">
          <div>
            <label
              htmlFor="productColor"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Color
            </label>
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              id="productColor"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product color..."
            />
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <div className="grid grid-cols-1">
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700 "
            >
              Availability
            </label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value === "true")}
              id="availability"
              className="w-fit px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="rentalPrice"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rental Price
            </label>
            <input
              value={rentalPrice}
              onChange={(e) => setRentalPrice(e.target.value)}
              type="number"
              id="rentalPrice"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter rental price..."
            />
          </div>

          <div>
            <label
              htmlFor="rentalDurationOptions"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rental Duration Options (comma separated)
            </label>
            <input
              value={rentalDurationOptions.join(", ")}
              onChange={(e) =>
                setRentalDurationOptions(
                  e.target.value.split(",").map((opt) => parseInt(opt.trim()))
                )
              }
              type="text"
              id="rentalDurationOptions"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter rental durations..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Material
            </label>
            <input
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              type="text"
              id="material"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter material..."
            />
          </div>

          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Weight
            </label>
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              id="weight"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter weight..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="stockQuantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Stock Quantity
            </label>
            <input
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              type="number"
              id="stockQuantity"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter stock quantity..."
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              id="location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter location..."
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAddProduct}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

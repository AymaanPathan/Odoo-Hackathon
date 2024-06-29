// FancyBox.js
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function FancyBox() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="fixed inset-0 select-none bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className={`bg-white/70 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 ${
          animate ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Opps!</h2>
        <p className="mb-6 text-gray-700">
          Log in or sign up to access your shopping cart.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white hover:bg-red-900 hover:text-white duration-300 text-black py-2 px-6 rounded-md shadow-md transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-white hover:bg-red-900 hover:text-white duration-300 py-2 px-6 rounded-md shadow-md transition-colors"
          >
            Home Page
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-white hover:bg-red-900 hover:text-white duration-300 py-2 px-6 rounded-md shadow-md transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default FancyBox;

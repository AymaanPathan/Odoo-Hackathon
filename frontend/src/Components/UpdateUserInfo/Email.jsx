import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UpdateEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.endsWith(".com");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/profile/update/Email",
        {
          method: "PUT",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast.success("Email updated successfully");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.Message || "An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Change Email</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Current Email
            </label>
            <input
              type="email"
              id="current-password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
              placeholder="Change Email"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-[#7F493F] rounded-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Change Email
          </button>
        </form>
        <Link to="/profile/update/Password">
          <button className="w-full px-4 py-2 mt-4 font-medium text-black rounded-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Change Password
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UpdateEmail;

/* eslint-disable react/prop-types */
import "./dropdown.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DropDown() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const deleteToken = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/");
  };

  return (
    <div>
      {
        <div className="dropdownProfile flex flex-col">
          <ul className="flex">
            <li>
              {token ? (
                <p className="px-6 whitespace-nowrap text-white rounded-lg bg-[#000000]">
                  Welcome, {name}
                </p>
              ) : (
                <Link to={"/register"}>Signup</Link>
              )}
            </li>
            <li>
              {token ? (
                <div className="flex items-center gap-4">
                  <p
                    className="px-4 text-white rounded-lg bg-red-600"
                    onClick={deleteToken}
                  >
                    Logout
                  </p>
                  <Link to={"/profile/update/Email"}>
                    <p className="px-4  text-white rounded-lg bg-red-600">
                      Update
                    </p>
                  </Link>
                </div>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </li>
          </ul>
        </div>
      }
    </div>
  );
}

import { useState } from "react";
import toast from "react-hot-toast";
import "./register.css";
import lady from "./lady.png";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Register
  const createAccount = async (e) => {
    if (username === "" || email === "" || password === "") {
      return toast.error("Please Provide Valid Credentials");
    }
    e.preventDefault();

    try {
      const loadingToastId = toast.loading("Creating account...");
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 400) {
        toast.error("Please Provide All Information");
        toast.dismiss(loadingToastId);
        return;
      }

      if (response.status === 401) {
        toast.error("User Already Exists!");
        toast.dismiss(loadingToastId);
        return;
      }

      if (!response.ok) {
        toast.error("Please Try Again Later");
        toast.dismiss(loadingToastId);
        return;
      }

      toast.success("User Successfully Created", {
        id: loadingToastId,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      localStorage.setItem("token", data.Data);
      localStorage.setItem("name", data.UserName);
      navigate("/");

      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const [passwordToggle, setPasswordToggle] = useState(true);

  const tPassoword = () => {
    setPasswordToggle(!passwordToggle);
  };

  return (
    <div className="main_register  justify-between">
      <div className="p-8">
        {/* Left */}
        <h1 className="text-2xl whitespace-nowrap font-semibold sign_text">
          Register To Create your account
        </h1>
        <div>
          <div className="grid w-full grid-cols-1 mt-4">
            <label>Name</label>
            <input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="text-sm mt-2 border-gray-400 border-[1px] rounded-md p-2 input-small"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="grid w-full grid-cols-1 mt-4">
            <label>Email</label>
            <input
              required
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
              className="text-sm mt-2 border-gray-400 border-[1px] rounded-md p-2 input-small"
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div className="w-full   mt-4">
            <div className="grid grid-cols-1">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 text-sm border-gray-400 border-[1px] rounded-md p-2 input-small"
                type={passwordToggle ? "password" : "text"}
                placeholder="Password"
              />
            </div>
            <i
              onClick={tPassoword}
              className={`far text-xl  ${
                passwordToggle ? "fa-eye-slash" : "fa-eye"
              } relative left-[90%] bottom-8 cursor-pointer `}
              id="togglePassword"
            ></i>
          </div>
          <div className="mt-6 text-xs flex items-center gap-2">
            <input type="checkbox" className="cursor-pointer" />
            <span>
              By signing up I agree to the Terms & Conditions and Privacy Policy
            </span>
          </div>
          <button
            onClick={createAccount}
            className="mt-4 py-2 px-5 text-white bg-[#1B2834] w-full"
          >
            SignUp
          </button>
        </div>
      </div>
      {/* Right */}
      <div className="register-img-div h-screen">
        <img className="w-[48rem] h-full object-cover" src={lady} alt="Lady" />
      </div>
    </div>
  );
}

export default Register;

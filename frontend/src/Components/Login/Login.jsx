/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import lady from "./lady.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    if (email === "" || password === "") {
      return toast.error("Please Provide Valid Email & Password");
    }
    try {
      const loadingId = toast.loading("Checking data....");
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success("Login SuccessFull", {
          id: loadingId,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        navigate("/");
        localStorage.setItem("token", data.Data);
        localStorage.setItem("name", data.username);
      }
      if (response.status === 400) {
        toast.error("Please Fill Email And Password Inputs");
        toast.dismiss(loadingId);
      }
      if (response.status === 401) {
        toast.error("User Not Found With This Email Id");
        toast.dismiss(loadingId);
      }
      if (response.status === 402) {
        toast.error("Password is incorrect");
        toast.dismiss(loadingId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [passwordToggle, setPasswordToggle] = useState(true);

  const tPassoword = () => {
    setPasswordToggle(!passwordToggle);
  };

  return (
    <div className="main_register flex gap-20 justify-between">
      <div className="p-8 w-full max-w-md">
        {/* Left */}
        <h1 className="text-2xl font-semibold mb-6">
          Login to Access your account
        </h1>
        <div className="space-y-6">
          <div className="grid grid-cols-1">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm mt-2 border-gray-400 border-[1px] rounded-md p-2 input-small"
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div className="grid grid-cols-1 relative">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 text-sm border-gray-400 border-[1px] rounded-md p-2 input-small"
              type={passwordToggle ? "password" : "text"}
              placeholder="Password"
            />
            <i
              onClick={tPassoword}
              className={`far text-xl  ${
                passwordToggle ? "fa-eye-slash" : "fa-eye"
              }  absolute left-[90%] bottom-1 cursor-pointer`}
              id="togglePassword"
            ></i>
          </div>
          <button
            onClick={loginUser}
            className="mt-4 py-2 px-5 text-white bg-[#1B2834] w-full"
          >
            Login
          </button>
        </div>
      </div>
      {/* Right */}
      <div className="register-img-div h-screen">
        <img className="w-[48rem] h-full" src={lady} alt="Lady" />
      </div>
    </div>
  );
}

export default Login;

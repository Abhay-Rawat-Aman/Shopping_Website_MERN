import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import logo from "../../assets/Images/logo.png";
import Button from "@mui/material/Button";
import { LuArrowRightToLine } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { IoLogoFacebook, IoLogoGoogleplus } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchUsername, LoginUser } from "../../Api/authApi";

const Login = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "userNew@gmail.com",
    password: "123456789",
    agreeTerm: false,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    context.setisHeaderFooterShown(false);
  }, [context]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleLoginSuccess = async (loginResponse) => {
  //   try {
  //     const userId = loginResponse.data.user._id;
  //     const usernameResponse = await fetchUsername(userId);
  //     if (usernameResponse.success) {
  //       const username = usernameResponse.data.userName;
  //       console.log("Fetched username:", username);
  //       // context.setUser({
  //       //   ...loginResponse.data.user,
  //       //   userName: username,
  //       // });
  //     } else {
  //       console.error("Failed to fetch username");
  //     }
  //   } catch (error) {
  //     console.error("Error in fetching username:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!userData.agreeTerm) {
      setError("Please agree to the Terms & Privacy Policy");
      return;
    }

    try {
      const response = await LoginUser(userData);
      

      console.log("User Logged API resp:", response.data);
      if (response.success ) {
        // await handleLoginSuccess(response);
        localStorage.setItem("firstName", response.data.fname);
        localStorage.setItem("lastName", response.data.lname);
          
        console.log(response);
        navigate("/");
        context.setisHeaderFooterShown(true);
        context.setIsLogin(true);
        context.setUser({
          email : response.data.email
        });

        setUserData({
          email: "",
          password: "",
          agreeTerm: false,
        });
      }
    } catch (err) {
      setError(err.message || "An error occurred during Login");
    }
  };

  return (
    <>
      <div className="flex header items-center justify-between">
        <div className="logo w-[300px] ">
          <img src={logo} alt="logo" className="w-[100%]" />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Button
            variant="text"
            className="btn-border btn-rounded px-4 py-2 flex gap-2 items-center justify-center"
          >
            <LuArrowRightToLine />
            <span>Login</span>
          </Button>
          <Button
            variant="contained"
            className="btn-color btn-rounded px-4 py-2 flex gap-2 items-center justify-center"
          >
            <FaRegUser />
            <span>SignUp</span>
          </Button>
        </div>
      </div>

      <div className="container signUpPage mx-auto py-12 px-3">
        <h1 className="rizzui-title-h2 mb-7 text-center text-[30px] font-bold leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-[45px] p-0">
          Welcome Back! <br /> Sign in with your credentials.
        </h1>

        <div className="flex items-center gap-3 mt-4 socialBtn">
          <Button className="col">
            <IoLogoGoogleplus /> sign in with google
          </Button>
          <Button className="col">
            <IoLogoFacebook /> sign in with facebook
          </Button>
        </div>

        <br />
        <h4 className="text-center text-sm font-bold">Or Sign up with Email</h4>
        <p className=" text-red-500 text-center text-sm font-bold"> Just Accept the Terms and policies and hit the sign up button</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form
          className="form w-full mx-auto mt-8 p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerm"
                id="agreeTerm"
                className="mr-2 w-4 h-4"
                checked={userData.agreeTerm}
                onChange={handleChange}
              />
              <span className="text-sm text-gray-600">
                By signing up you have agreed to our Terms & Privacy Policy
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="contained"
              className="submitBtn btn-rounded px-4 py-3 w-full"
              type="submit"
            >
              Sign Up
            </Button>
          </div>
          <div className="mb-b text-center text-gray-600 font-bold ">
            Already have an account?{" "}
            <Link to="/login" className="text-black no-underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

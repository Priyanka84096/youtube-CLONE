import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin, loginSignupSwitchHandler, setUserName } from "../store/slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const isLogin = useSelector((state) => state.auth.loginSignupSwitch);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;

    // if login mode is true then we'll login the user
    if (isLogin) {
      const password = passRef.current.value;

      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          { email, password },
          { withCredentials: true }
        );

        console.log("response from authentication.jsx--", response);

        if (response.status === 200 || response.status === 201) {
          dispatch(handleLogin());

          const fetchUser = await axios.get("http://localhost:4000/getUser", {
            withCredentials: true,
          })

          if(fetchUser.status === 200){
            console.log("getting user after authentication---",fetchUser);
            
            dispatch(setUserName(fetchUser.data.result.username));
          };
          
        }
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
      }

      emailRef.current.value = "";
      passRef.current.value = "";

    } else {
      // if login mode is false then we'll create a new user
      const username = usernameRef.current.value.trim();
      const password = passRef.current.value;
      const confirmPassword = confirmPassRef.current.value;

      //verifying the entered values
      if (
        !/^[a-zA-Z0-9_]+$/.test(username) &&
        username.length > 0 &&
        username.length < 20
      ) {
        alert("Username can only contain letters, numbers, and underscores");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }

      if (confirmPassword !== password) {
        alert("Password must be same, try again.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:4000/signup", {
          username,
          email,
          password,
        });

        if (response.status === 201) {
          alert("account created successfully, Please login.");
          dispatch(loginSignupSwitchHandler());
        } else {
          console.error("Failed to create new user:", response.data);
        }
      } catch (error) {
        console.error("Failed to create new user:", error.message);
      }

      usernameRef.current.value = "";
      emailRef.current.value = "";
      passRef.current.value = "";
      confirmPassRef.current.value = "";
    }
  };

  return (
    
    <div className="flex items-center pt-32 justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 screen-max-7:pt-44">
        <div className="bg-white p-8 rounded-md shadow-2xl border border-gray-300 w-full max-w-md transform -translate-y-16 transition-transform duration-500 ease-in-out">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? "Login" : "Sign In"}
          </h2>
          <form onSubmit={submitHandler}>
            {!isLogin && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter username"
                  ref={usernameRef}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
                ref={emailRef}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
                ref={passRef}
                required
              />
            </div>
            {!isLogin && (
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="conf-password"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="conf-password"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Re-enter password"
                  ref={confirmPassRef}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {isLogin ? "Login" : "Sign In"}
            </button>
            <div className="mt-5 text-center">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <span
                    className="text-purple-500 hover:underline cursor-pointer"
                    onClick={() => dispatch(loginSignupSwitchHandler())}
                  >
                    Sign in
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-purple-500 hover:underline cursor-pointer"
                    onClick={() => dispatch(loginSignupSwitchHandler())}
                  >
                    Login
                  </span>
                </>
              )}
            </div>
          </form>
        </div>
    </div>

  );
};

export default Auth;
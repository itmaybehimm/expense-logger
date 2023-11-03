import React from "react";
import LoginForm from "../components/loginPage/LoginForm";
import "../styles/loginPageCustom.css";
import HomeButtonLoginPage from "../components/loginPage/homeButtonLoginPage";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      id="login-page"
      className="h-screen w-screen justify-center items-center flex font-serif text-xs sm:text-sm md:text-base bg-gray-200"
    >
      <HomeButtonLoginPage />

      <div className="login-div h-96 w-full mx-6 md:aspect-video md:min-w-[700px] md:w-2/3 md:h-auto flex flex-col md:flex-row blur-none shadow-xl">
        <div id="login-div-login-side flex " className="flex-1">
          <LoginForm />
        </div>

        <div
          id="login-div-photo-side"
          className="flex-1 hidden md:flex md:flex-col gap-4 lg:gap-6 2xl:gap-8 relative bg-login-side-bg bg-center bg-cover text-white  items-center justify-center -z-10 "
        >
          <div className="w-full h-full absolute backdrop-blur-[8px] -z-10"></div>
          <div className="text-3xl xl:text-5xl 2xl:text-7xl 3xl:text-9xl font-bold">
            New Here?
          </div>
          <div className="flex flex-col gap-3 lg:gap-4 2xl:gap-5 items-center justify-center text-xs xl:text-base 2xl:text-xl 3xl:text-3xl">
            <span className="">Sign up for a account</span>
            <button
              className="bg-white min-w-[80px] w-[60%] aspect-[22/9] flex items-center justify-center rounded-full hover:scale-110 hover:brightness-90 transition-all"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text">
                Sign up
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

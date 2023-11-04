import React from "react";
import LoginForm from "../components/loginPage/LoginForm";
import HomeButtonLoginPage from "../components/loginPage/HomeButtonLoginPage";
import { useNavigate } from "react-router-dom";
import SignUpButtonLoginPage from "../components/loginPage/SignUpButtonLoginPage";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      id="login-page"
      className="h-screen w-screen justify-center items-center flex font-serif text-xs sm:text-sm md:text-base bg-mercury bg-login-side-bg dark:bg-login-side-dark-bg bg-center bg-cover relative"
    >
      <div className="w-full h-full absolute backdrop-blur-[8px] 2k:backdrop-blur-[12px]"></div>

      <HomeButtonLoginPage />
      <SignUpButtonLoginPage />

      <div className="login-div h-96 w-full mx-6 md:aspect-video md:min-w-[700px] md:w-2/3 md:h-auto flex flex-col md:flex-row bg-cs-white/20 dark:bg-cs-black/40 shadow-black-full dark:shadow-neon-full backdrop-blur-[8px] 2k:backdrop-blur-[12px] rounded-2xl">
        <div id="login-div-login-side" className="flex-1  md:border-r-2">
          <LoginForm />
        </div>

        <div
          id="login-div-photo-side"
          className="flex-1 hidden md:flex md:flex-col gap-4 lg:gap-6 2xl:gap-8 text-cs-white  items-center justify-center "
        >
          <div className=" huge-login-text-res font-bold">New Here?</div>
          <div className="flex flex-col gap-3 lg:gap-4 2xl:gap-5 4k:gap-6 items-center justify-center normal-login-text-res">
            <span className="">Create a new account</span>
            <button
              className="bg-cs-white min-w-[100px] max-h-[80px] w-[70%] max-w-[220px] aspect-[22/9] flex items-center justify-center rounded-full hover:scale-110 dark:bg-cs-white/20 hover:brightness-90 dark:hover:bg-cs-white/100  transition-all"
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

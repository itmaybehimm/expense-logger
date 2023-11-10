import React from "react";
import LoginForm from "../components/loginPage/LoginForm";
import HomeButtonLoginPage from "../components/loginPage/HomeButtonLoginPage";
import { useNavigate } from "react-router-dom";
import SignUpButtonLoginPage from "../components/loginPage/SignUpButtonLoginPage";
import TopPopup from "../components/modal/TopPopup";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      id="login-page"
      className="h-screen w-screen justify-center items-center flex font-serif text-xs sm:text-sm md:text-base bg-mercury bg-login-side-bg dark:bg-login-side-dark-bg bg-center bg-cover relative"
    >
      <TopPopup />
      <div className="w-full h-full absolute backdrop-blur-[8px] 2k:backdrop-blur-[12px]"></div>

      <HomeButtonLoginPage />
      <SignUpButtonLoginPage />

      <div className="login-div h-96 w-full mx-6 md:aspect-video md:min-w-[700px] md:w-2/3 md:h-auto flex flex-col md:flex-row bg-cs-white/20 dark:bg-cs-black/40 shadow-black-full dark:shadow-neon-full-sm md:dark:shadow-neon-full-xl backdrop-blur-[8px] 2k:backdrop-blur-[12px] rounded-2xl justify-center">
        <div
          id="login-div-login-side"
          className="w-full md:w-1/2 md:border-r-2"
        >
          <LoginForm />
        </div>

        <div
          id="login-div-photo-side"
          className="w-full md:w-1/2 hidden md:flex md:flex-col gap-4 lg:gap-6 2xl:gap-8 text-cs-white  items-center justify-center "
        >
          <div className=" huge-login-text-res font-bold">New Here?</div>
          <div className="flex flex-col gap-3 lg:gap-4 2xl:gap-5 4k:gap-6 items-center justify-center normal-login-text-res">
            <span className="">Create a new account</span>
            <button
              className="min-w-[100px] max-h-[80px] w-[70%] max-w-[220px] aspect-[22/9] flex items-center justify-center login-button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <span className="login-button-span">Sign up</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

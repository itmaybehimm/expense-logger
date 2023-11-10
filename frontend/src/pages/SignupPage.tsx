import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SingupForm from "../components/signupPage/SignupForm";
import LoginButtonSignupPage from "../components/signupPage/LoginButtonSignupPage";
import HomeButtonSignupPage from "../components/signupPage/HomeButtonSignupPage";
import { MdOutlineNavigateNext } from "react-icons/md";
import TopPopup from "../components/modal/TopPopup";

const SignupPage: React.FC = () => {
  const [nextStep, setNextStep] = useState(false);

  const navigate = useNavigate();
  return (
    <div
      id="signup-page"
      className="h-screen w-screen justify-center items-center flex font-serif text-xs sm:text-sm md:text-base bg-mercury bg-login-side-bg dark:bg-login-side-dark-bg bg-center bg-cover relative"
    >
      <TopPopup />
      <div className="w-full h-full absolute backdrop-blur-[8px] 2k:backdrop-blur-[12px]"></div>
      <HomeButtonSignupPage />
      <LoginButtonSignupPage />

      <div className="login-div h-96 w-full mx-6 md:aspect-video md:min-w-[700px] md:w-2/3 md:h-auto flex flex-col md:flex-row-reverse bg-cs-white/20 dark:bg-cs-black/40 shadow-black-full dark:shadow-neon-full-sm md:dark:shadow-neon-full-xl backdrop-blur-[8px] 2k:backdrop-blur-[12px] rounded-2xl justify-center relative">
        <div
          id="signup-div-signup-side"
          className="w-full md:w-1/2 md:border-l-[1px]  "
        >
          <button
            className="flex items-center justify-center z-10 w-12 aspect-square rounded-full absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              setNextStep((prevState) => !prevState);
            }}
          >
            {nextStep || (
              <MdOutlineNavigateNext className="z-10 scale-200 text-purple dark:text-white" />
            )}
            {nextStep && (
              <MdOutlineNavigateNext className="z-10 scale-200 text-purple dark:text-white rotate-180" />
            )}
          </button>

          <SingupForm nextStep={nextStep} setNextStep={setNextStep} />
        </div>

        <div
          id="signup-div-photo-side"
          className="w-1/2 hidden md:flex md:flex-col gap-4 lg:gap-6 2xl:gap-8 text-cs-white  items-center justify-center md:border-r-[1px]"
        >
          <div className=" huge-login-text-res font-bold">Returing User?</div>
          <div className="flex flex-col gap-3 lg:gap-4 2xl:gap-5 4k:gap-6 items-center justify-center normal-login-text-res">
            <span className="">Log in to your account</span>
            <button
              className="min-w-[100px] max-h-[80px] w-[70%] max-w-[220px] aspect-[22/9] flex items-center justify-center login-button"
              onClick={() => {
                navigate("/login");
              }}
            >
              <span className="login-button-span">Log in</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

import React from "react";
import { FiHome } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const HomeButtonLoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      id="login-page-home-button"
      className="z-10 w-12 2xl:w-20 3xl:w-32 aspect-square rounded-full absolute top-4 left-4 cursor-pointer transition-all bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-none"
    >
      <button
        className=" flex items-center justify-center w-full h-full relative"
        onClick={() => {
          navigate("/");
        }}
      >
        <FiHome className="home-icon z-10 scale-200 md:scale-150 2xl:scale-[2.2] 3xl:scale-[3] transition-all absolute text-white" />
        <BiArrowBack className="back-icon z-10 translate-x-10 opacity-0 scale-200 md:scale-150 2xl:scale-[2.2] 3xl:scale-[3] transition-all absolute text-violet-500" />
      </button>
    </div>
  );
};

export default HomeButtonLoginPage;

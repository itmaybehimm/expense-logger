import React from "react";
import { FiHome } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const HomeButtonLoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      id="login-page-home-button"
      className="z-10 w-12 2xl:w-20 4k:w-32 aspect-square rounded-full absolute top-4 left-4 cursor-pointer transition-all bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-none group dark:bg-none "
    >
      <button
        className=" flex items-center justify-center w-full h-full relative "
        onClick={() => {
          navigate("/");
        }}
      >
        <FiHome className="home-icon z-10 scale-200 md:scale-150 2xl:scale-[2.2] 4k:scale-[3] transition-all absolute text-cs-white group-hover:opacity-0 group-hover:-translate-x-[20px]" />
        <BiArrowBack className="back-icon z-10 translate-x-10 opacity-0 scale-200 md:scale-150 2xl:scale-[2.2] 4k:scale-[3] transition-all absolute text-cs-white  group-hover:scale-200 group-hover:opacity-100 group-hover:translate-x-[0px]" />
      </button>
    </div>
  );
};

export default HomeButtonLoginPage;

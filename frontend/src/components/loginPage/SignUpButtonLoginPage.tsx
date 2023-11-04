import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";

function SignUpButtonLoginPage() {
  const navigate = useNavigate();

  return (
    <div
      id="login-page-home-button"
      className="z-10 w-12 aspect-square rounded-full absolute top-4 right-4 cursor-pointer bg-gradient-to-r from-violet-500  to-fuchsia-500 md:invisible dark:bg-none"
    >
      <button
        className=" flex items-center justify-center w-full h-full relative "
        onClick={() => {
          navigate("/signup");
        }}
      >
        <AiOutlineUserAdd className="home-icon z-10 scale-200  absolute text-cs-white" />
      </button>
    </div>
  );
}

export default SignUpButtonLoginPage;

import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div
      id="login-page"
      className="h-screen w-screen flex justify-center items-center"
    >
      <div className="login-div aspect-video h-4/6 flex ">
        <div id="login-div-login-side flex" className="flex-1">
          <LoginForm />
        </div>
        <div id="login-div-signup-side " className="flex-1">
          signup Here
          {/* router link to /signup */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

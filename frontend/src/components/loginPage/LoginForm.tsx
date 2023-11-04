import React, { useEffect } from "react";
import { useState } from "react";
import {
  passwordValid,
  usernameValid,
} from "../../../utils/customFunctions.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import {
  getUser,
  loginUser,
} from "../../features/authentication/loginThunk.ts";
import { Link, useNavigate } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
import { CiUser } from "react-icons/ci";

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [wasFormSubmitted, setWasFormSubmitted] = useState(false);

  wasFormSubmitted;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    setWasFormSubmitted(true);
    if (isPasswordValid && isUsernameValid) {
      const formData: FormData = {
        username: username,
        password: password,
      };

      dispatch(loginUser(formData)).then((response) => {
        // response={type: 'auth/loginUser/fulfilled', payload: {…}, meta: {…}}
        // response={type: 'auth/loginUser/rejected', payload: undefined, meta: {…}, error: {…}} if error
        // console.log(response);

        if (response.type === "auth/loginUser/fulfilled") {
          const token: string = response.payload.token;
          dispatch(getUser(token)).then(() => {
            navigate("/home");
          });
        }

        //handle error
        if (response.type === "auth/loginUser/rejected") {
          //can use user.state.error
          console.log("something went wrong");
        }
      });
    }
  }

  //useEffect to notify form invalid we can use input.add class name

  useEffect(() => {
    //if username undefined then it won't go inside function for some reason empty string "" is falsy value
    if (username && usernameValid(username)) {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
    }

    if (password && passwordValid(password)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [username, password]);

  return (
    <form
      id="login-form"
      className="flex flex-col h-full items-center justify-center mt-6 gap-8 4k:gap-24"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-full items-center justify-center gap-8 2k:gap-12 4k:gap-16">
        <div className="text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px]  min-w-[180px] w-[66%] md:w-1/2 md:opacity-60 hover:opacity-100 input-login-text-res ">
          <CiUser className="h-full" />
          <input
            //must use text else "" undefined and also it won't be string type
            type="text"
            className=" bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans "
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className=" flex flex-col items-center justify-start w-full">
          <div className=" text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px] min-w-[180px] w-[66%] md:w-1/2 md:opacity-60 hover:opacity-100 input-login-text-res">
            <MdLockOutline className="h-full" />
            <input
              className=" bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans  "
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="min-w-[180px] md:min-w-[240px] w-[66%] md:w-1/2 flex justify-end ">
            <Link
              to="/forgot_password"
              className="text-xs 2k:text-xl mt-2 text-cs-white md:opacity-60 hover:opacity-100"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      <button
        className="bg-cs-white min-w-[100px] max-h-[80px] w-[20%] max-w-[220px] aspect-[22/9] flex items-center justify-center rounded-full hover:scale-110 dark:bg-cs-white/20 hover:brightness-90 dark:hover:bg-cs-white/100 transition-all"
        type="submit"
      >
        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text normal-login-text-res ">
          Log in
        </span>
      </button>
    </form>
  );
};

export default LoginForm;

import React, { useEffect } from "react";
import { useState } from "react";
import {
  passwordValid,
  usernameValid,
} from "../../../utils/customFunctions.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { loginUser } from "../../features/authentication/loginThunk.ts";
import { Link, useNavigate } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { displayPopup, hidePopup } from "../../features/popup/popupslice.tsx";

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [wasFormSubmitted, setWasFormSubmitted] = useState(false);
  const loading = useAppSelector((state) => state.auth.loading);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    setWasFormSubmitted(true);
    if (!(isPasswordValid && isUsernameValid)) return;

    if (loading) return;

    const formData: FormData = {
      username: username,
      password: password,
    };

    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        dispatch(
          displayPopup({ message: error.error_data, status: error.status })
        );
        setTimeout(() => dispatch(hidePopup()), 3000);
      });
  }

  useEffect(() => {
    if (usernameValid(username)) setIsUsernameValid(true);
    else setIsUsernameValid(false);

    if (passwordValid(password)) setIsPasswordValid(true);
    else setIsPasswordValid(false);
  }, [username, password]);

  return (
    <form
      id="login-form"
      className="flex flex-col h-full items-center justify-center mt-6 gap-8 4k:gap-24"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-full items-center justify-center gap-8 2k:gap-12 4k:gap-16">
        <div className="text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px]  min-w-[180px] w-[66%] md:w-1/2 md:opacity-60 hover:opacity-100 input-login-text-res relative">
          <CiUser className="h-full" />
          <input
            //must use text else "" undefined and also it won't be string type
            type="text"
            className="bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans "
            name="username"
            placeholder="Username"
            minLength={8}
            maxLength={20}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          {wasFormSubmitted &&
            (isUsernameValid || (
              <span className="small-login-text-res absolute top-[100%] pl-1 text-red">
                Username is invalid.
              </span>
            ))}
        </div>
        <div className=" flex flex-col items-center justify-start w-full ">
          <div className=" text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px] min-w-[180px] w-[66%] md:w-1/2 md:opacity-60 hover:opacity-100 input-login-text-res relative">
            <MdLockOutline className="h-full" />
            <input
              className=" bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans  "
              type="password"
              placeholder="Password"
              minLength={8}
              maxLength={20}
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {wasFormSubmitted &&
              (isPasswordValid || (
                <span className="small-login-text-res absolute top-[100%] pl-1 text-red">
                  Password is invalid
                </span>
              ))}
          </div>

          <div className="min-w-[180px] md:min-w-[240px] w-[66%] md:w-1/2 flex justify-end ">
            <Link
              to="/forgot_password"
              className="small-login-text-res mt-2 text-cs-white md:opacity-60 hover:opacity-100"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      <button
        className=" min-w-[100px] max-h-[80px] w-[20%] max-w-[220px] aspect-[22/9] flex items-center justify-center login-button"
        type="submit"
      >
        <span className="login-button-span">Log in</span>
      </button>
    </form>
  );
};

export default LoginForm;

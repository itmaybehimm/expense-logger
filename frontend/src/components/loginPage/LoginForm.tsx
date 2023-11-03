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
      className="flex flex-col bg-yellow-300 h-full"
      onSubmit={handleSubmit}
    >
      <div className="h-1/4 justify-center items-center flex font-bold bg-blue-200">
        Log into your account
      </div>

      <div className="flex flex-col items-center">
        <div> Login Using</div>
        <div>photos</div>
      </div>

      <label className="flex flex-col p-2 items-center">
        Username
        {wasFormSubmitted && (isUsernameValid || <span>username invalid</span>)}
        <input
          //must use text else "" undefined and also it won't be string type
          type="text"
          className="border rounded-md w-3/4 md:w-1/2 max-w-md border-red-50 "
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>

      <label className="flex flex-col p-2  items-center">
        Password:k27Gsd21@
        {wasFormSubmitted && (isPasswordValid || <span>password invalid</span>)}
        <input
          className="border"
          type="password"
          placeholder=""
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <div className="flex justify-between px-6">
        <Link to="/signup" className="md:hidden">
          Signup
        </Link>
        <Link to="/forgot_password">Forgot password?</Link>
      </div>

      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;

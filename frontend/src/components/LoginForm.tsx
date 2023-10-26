import React from "react";
import { useState, useEffect } from "react";
import { passwordValid, usernameValid } from "../../utils/customFunctions.ts";

interface FormData {
  username: string;
  password: string;
}

interface FormValid {
  isUsernameValid: boolean;
  isPasswordValid: boolean;
}

const initialFormState: FormData = {
  username: "",
  password: "",
};

const initialFormValidState: FormValid = {
  isUsernameValid: true,
  isPasswordValid: true,
};

const LoginForm: React.FC = function () {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [formValidState, setFormValidState] = useState<FormValid>(
    initialFormValidState
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function formValidation(): void {
    //The issue you're facing where isUsernameValid is always being set to true could be due to the way state updates are handled in React. When you update the state by spreading the previous state using { ...formValidState }, you may not be getting the most up-to-date state, especially within the same function call. so use prevFormValidState
    //You are correct that when you replace the entire object with a new object, the change should be reflected in the state. However, React's state updates are asynchronous, and there may be situations where the new state is not immediately reflected when you read the state immediately after calling setState. This can lead to unexpected results when you are directly copying the previous state and making changes.

    //if username undefined then it won't go inside function for some reason empty string "" is undefined

    if (formData.username && usernameValid(formData.username)) {
      console.log("valid");
      setFormValidState((prevFormValidState) => ({
        ...prevFormValidState,
        isUsernameValid: true,
      }));
    } else {
      console.log("invalid");
      setFormValidState((prevFormValidState) => ({
        ...prevFormValidState,
        isUsernameValid: false,
      }));
    }

    if (formData.password && passwordValid(formData.password)) {
      setFormValidState((prevFormValidState) => ({
        ...prevFormValidState,
        isPasswordValid: true,
      }));
    } else {
      setFormValidState((prevFormValidState) => ({
        ...prevFormValidState,
        isPasswordValid: false,
      }));
    }
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    formValidation();
  }

  //useEffect to notify form invalid we can use input.add class name
  useEffect(() => {
    console.log(formValidState);
  }, [formValidState]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <form id="login-form" className="flex flex-col" onSubmit={handleSubmit}>
      <div>Log into your account</div>

      <label className="flex flex-col">
        Username
        {formValidState.isUsernameValid || <span>username invalid</span>}
        <input
          //must use text else "" undefined and also it won't be string type
          type="text"
          className="border rounded-md"
          name="username"
          placeholder=""
          value={formData.username}
          onChange={handleChange}
        />
      </label>

      <label className="flex flex-col">
        Password
        {formValidState.isPasswordValid || <span>password invalid</span>}
        <input
          className="border"
          type="password"
          placeholder=""
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;

import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import {
  emailValid,
  nameValid,
  passwordValid,
  usernameValid,
} from "../../../utils/customFunctions.ts";

import SignupForm1 from "./SignupForm1.tsx";
import SignupForm2 from "./SignupForm2.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { displayPopup, hidePopup } from "../../features/popup/popupslice.tsx";
import { SignupFormData } from "../../interfaces/signupRelated.tsx";
import { signupUser } from "../../features/signup/signupThunk.tsx";
import { useNavigate } from "react-router-dom";

const SingupForm: React.FC<{
  nextStep: boolean;
  setNextStep: Dispatch<SetStateAction<boolean>>;
}> = function ({ nextStep, setNextStep }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [profilePic, setProfilePic] = useState<File>();

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [arePasswordsSame, setArePasswordsSame] = useState(false);
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [wasFormSubmitted, setWasFormSubmitted] = useState(false);
  const loading = useAppSelector((state) => state.signup.loading);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const props1 = {
    username: username,
    password: password,
    password2: password2,
    email: email,
    isUsernameValid: isUsernameValid,
    isEmailValid: isEmailValid,
    isPasswordValid: isPasswordValid,
    arePasswordsSame: arePasswordsSame,
    setUsername: setUsername,
    setEmail: setEmail,
    setPassword: setPassword,
    setPassword2: setPassword2,
    setNextStep: setNextStep,
    wasFormSubmitted: wasFormSubmitted,
  };

  const props2 = {
    firstName: firstName,
    lastName: lastName,
    profilePic: profilePic,
    dob: dob,
    setFirstName: setFirstName,
    setLastName: setLastName,
    setDob: setDob,
    setProfilePic: setProfilePic,
    wasFormSubmitted: wasFormSubmitted,
    setWasFormSubmitted: setWasFormSubmitted,
    isFirstNameValid: isFirstNameValid,
    isLastNameValid: isLastNameValid,
  };

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    console.log("submitted");
    setWasFormSubmitted(true);
    if (
      !(
        isPasswordValid &&
        isUsernameValid &&
        isFirstNameValid &&
        isLastNameValid &&
        arePasswordsSame
      )
    ) {
      dispatch(
        displayPopup({ message: "Some fields are invalid", status: 401 })
      );
      setTimeout(() => dispatch(hidePopup()), 5000);
      return;
    }
    if (loading) return;

    const formData: SignupFormData = {
      username: username,
      email: email,
      password: password,
      last_name: lastName,
      first_name: firstName,
      dob: dob,
      profile_pic: profilePic,
    };

    dispatch(signupUser(formData))
      .unwrap()
      .then((data) => {
        dispatch(displayPopup({ message: data.message, status: data.status }));
        setTimeout(() => dispatch(hidePopup()), 3000);
        setTimeout(() => navigate("/login"), 2000);
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

    if (emailValid(email)) setIsEmailValid(true);
    else setIsEmailValid(false);

    if (passwordValid(password)) setIsPasswordValid(true);
    else setIsPasswordValid(false);

    if (password === password2) setArePasswordsSame(true);
    else setArePasswordsSame(false);

    if (nameValid(firstName)) setIsFirstNameValid(true);
    else setIsFirstNameValid(false);

    if (nameValid(lastName)) setIsLastNameValid(true);
    else setIsLastNameValid(false);
  }, [username, password, firstName, lastName, password2, email]);

  return (
    <form
      id="singup-form"
      className="flex flex-col h-full items-center justify-center mt-6 gap-8 4k:gap-24 relative"
      onSubmit={handleSubmit}
    >
      {nextStep || <SignupForm1 {...props1} />}
      {nextStep && <SignupForm2 {...props2} />}
    </form>
  );
};

export default SingupForm;

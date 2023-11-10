import React, { Dispatch, SetStateAction } from "react";

interface MyComponentProps {
  firstName: string;
  lastName: string;
  profilePic: File | undefined;
  dob: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setDob: Dispatch<SetStateAction<string>>;
  setProfilePic: Dispatch<SetStateAction<File | undefined>>;
  wasFormSubmitted: boolean;
  setWasFormSubmitted: Dispatch<SetStateAction<boolean>>;
  isFirstNameValid: boolean;
  isLastNameValid: boolean;
}

const SignupForm2: React.FC<MyComponentProps> = (props) => {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center gap-8 2k:gap-12 4k:gap-16">
        <div className="text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px]  min-w-[180px] w-[66%] md:w-1/2 md:opacity-60 hover:opacity-100 input-login-text-res relative">
          <input
            type="text"
            className=" bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans "
            name="firstName"
            placeholder="First Name"
            pattern="[A-Za-z]{4,20}"
            value={props.firstName}
            onChange={(e) => {
              props.setFirstName(e.target.value);
            }}
          />
          {props.wasFormSubmitted &&
            (props.isFirstNameValid || (
              <span className="small-login-text-res absolute top-[100%] pl-1 text-red">
                Name is invalid.
              </span>
            ))}
        </div>

        <div className="text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px]  min-w-[180px] w-[66%] md:w-1/2 md:opacity-60 hover:opacity-100 input-login-text-res relative">
          <input
            type="text"
            className=" bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans "
            name="lastName"
            pattern="[A-Za-z]{4,20}"
            placeholder="Last Name"
            value={props.lastName}
            onChange={(e) => {
              props.setLastName(e.target.value);
            }}
          />
          {props.wasFormSubmitted &&
            (props.isLastNameValid || (
              <span className="small-login-text-res absolute top-[100%] pl-1 text-red">
                Name is invalid.
              </span>
            ))}
        </div>

        <div className=" flex flex-col items-center justify-start w-[66%] md:w-1/2  ">
          <div className=" text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px] min-w-[180px] w-full md:opacity-60 hover:opacity-100 input-login-text-res relative">
            <label htmlFor="dob-signup-form">DOB: </label>
            <input
              className=" bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans  "
              type="date"
              id="dob-signup-form"
              placeholder="DOB"
              name="dob"
              value={props.dob}
              onChange={(e) => {
                props.setDob(e.target.value);
              }}
              required
            />
          </div>
        </div>

        <div className=" flex flex-col items-center justify-start w-[66%] md:w-1/2 ">
          <div className=" text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px] min-w-[180px] w-full md:opacity-60 hover:opacity-100 input-login-text-res relative overflow-hidden">
            <input
              id="signup-profile-pic"
              className=" bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans "
              accept="image/*"
              type="file"
              name="profilePic"
              onChange={(e) => {
                props.setProfilePic(
                  e.target.files ? e.target.files[0] : undefined
                );
                const label = document.getElementById(
                  "label-for-profile-pic-sginup"
                );
                if (label) {
                  label.innerHTML = e.target.files
                    ? e.target.files[0].name
                    : "";
                }
              }}
              required
              style={{ display: "none" }}
            />
            <label
              id="label-for-profile-pic-sginup"
              htmlFor="signup-profile-pic"
            >
              Profile Picture
            </label>
          </div>
        </div>
      </div>
      <button
        className=" min-w-[100px] max-h-[80px] w-[20%] max-w-[220px] aspect-[22/9] flex items-center justify-center login-button"
        type="submit"
      >
        <span className="login-button-span">Submit</span>
      </button>
    </>
  );
};

export default SignupForm2;

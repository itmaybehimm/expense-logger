import React, { Dispatch, SetStateAction } from "react";
import { MdLockOutline } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
interface MyComponentProps {
  username: string;
  password: string;
  password2: string;
  email: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setPassword2: Dispatch<SetStateAction<string>>;
  setNextStep: Dispatch<SetStateAction<boolean>>;
  wasFormSubmitted: boolean;
  isEmailValid: boolean;
  isUsernameValid: boolean;
  isPasswordValid: boolean;
  arePasswordsSame: boolean;
}

const SignupForm1: React.FC<MyComponentProps> = (props) => {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center gap-8 2k:gap-12 4k:gap-16">
        <div className="text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px]  min-w-[180px] w-[66%] md:w-1/2 md:opacity-60 hover:opacity-100 input-login-text-res relative">
          <AiOutlineMail className="h-full" />
          <input
            type="email"
            className=" bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans "
            name="email"
            placeholder="Email"
            value={props.email}
            onChange={(e) => {
              props.setEmail(e.target.value);
            }}
          />{" "}
          {props.wasFormSubmitted &&
            (props.isEmailValid || (
              <span className="small-login-text-res absolute top-[100%] pl-1 text-red">
                Email is invalid.
              </span>
            ))}
        </div>

        <div className="text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px]  min-w-[180px] w-[66%] md:w-1/2 md:opacity-60 hover:opacity-100 input-login-text-res relative">
          <CiUser className="h-full" />
          <input
            //must use text else "" undefined and also it won't be string type
            type="text"
            className=" bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans "
            name="username"
            placeholder="Username"
            value={props.username}
            onChange={(e) => {
              props.setUsername(e.target.value);
            }}
          />
          {props.wasFormSubmitted &&
            (props.isUsernameValid || (
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
              name="password"
              value={props.password}
              onChange={(e) => {
                props.setPassword(e.target.value);
              }}
            />
            {props.wasFormSubmitted &&
              (props.isPasswordValid || (
                <span className="small-login-text-res absolute top-[100%] pl-1 text-red">
                  Password is invalid
                </span>
              ))}
            {props.wasFormSubmitted &&
              props.isPasswordValid &&
              (props.isPasswordValid || (
                <span className="small-login-text-res absolute top-[100%] pl-1 text-red">
                  Password don't match
                </span>
              ))}
          </div>
        </div>

        <div className=" flex flex-col items-center justify-start w-full ">
          <div className=" text-cs-white flex items-center border-b-[1px] gap-1 2k:gap-2 4k:gap-4 md:min-w-[240px] min-w-[180px] w-[66%] md:w-1/2 md:opacity-60 hover:opacity-100 input-login-text-res relative">
            <MdLockOutline className="h-full" />
            <input
              className=" bg-transparent placeholder-cs-white focus:outline-none focus:placeholder:opacity-0 font-sans  "
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={props.password2}
              onChange={(e) => {
                props.setPassword2(e.target.value);
              }}
            />
            {props.wasFormSubmitted &&
              (props.arePasswordsSame || (
                <span className="small-login-text-res absolute top-[100%] pl-1 text-red">
                  Password don't match
                </span>
              ))}
          </div>
        </div>
      </div>
      <button
        className=" min-w-[100px] max-h-[80px] w-[20%] max-w-[220px] aspect-[22/9] flex items-center justify-center login-button"
        onClick={() => props.setNextStep(true)}
      >
        <span className="login-button-span">Next</span>
      </button>
    </>
  );
};

export default SignupForm1;

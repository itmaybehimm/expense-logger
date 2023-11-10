import React, { useState, ChangeEvent, useEffect } from "react";
import TopPopup from "../components/modal/TopPopup";
import HomeButtonSignupPage from "../components/signupPage/HomeButtonSignupPage";
import LoginButtonOtpPage from "../components/otpPage/LoginButtonOtpPage";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { displayPopup, hidePopup } from "../features/popup/popupslice";

const backendURL = import.meta.env.VITE_BACKEND_API_BASE_URL;

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const tokenScucess = useAppSelector((state) => state.auth.tokenSuccess);
  const token = useAppSelector((state) => state.auth.token);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const config = {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  function handleOtpChange(e: ChangeEvent<HTMLInputElement>): void {
    const inOtp = e.target.value;
    setOtp(inOtp);
    //testing otp using regex
    if (inOtp.length !== 6 || !/^\d+$/.test(inOtp)) {
      e.target.setCustomValidity("Please enter a valid six-digit number.");
    } else {
      e.target.setCustomValidity("");
    }
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("otp", otp);
    try {
      const request = await axios.post(
        backendURL + "/users/otp/",
        formData,
        config
      );
      const response = await request.data;
      dispatch(
        displayPopup({ message: response.message, status: request.status })
      );
      setTimeout(() => {
        dispatch(hidePopup());
        setLoading(false);
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.error(error);
      let message = "";
      let status = 0;
      if (error instanceof AxiosError) {
        if (error.response) {
          message = error.response.data.message;
          status = error.response.status;
        } else {
          message = "Server Error";
          status = 500;
        }
      } else {
        message = "Unknown Error";
        status = 500;
      }
      dispatch(displayPopup({ message: message, status: status }));
      setTimeout(() => {
        dispatch(hidePopup());
        setLoading(false);
      }, 1000);
    }
  }

  async function sendOtp() {
    if (loading) {
      alert("Previous request is processing");
      return;
    }
    setLoading(true);
    try {
      const request = await axios.get(backendURL + "/users/otp/", config);
      const response = await request.data;
      dispatch(
        displayPopup({ message: response.message, status: request.status })
      );
      setTimeout(() => {
        dispatch(hidePopup());
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      let message = "";
      let status = 0;
      if (error instanceof AxiosError) {
        if (error.response) {
          message = error.response.data.message;
          status = error.response.status;
        } else {
          message = "Server Error";
          status = 500;
        }
      } else {
        message = "Unknown Error";
        status = 500;
      }
      dispatch(displayPopup({ message: message, status: status }));
      setTimeout(() => {
        dispatch(hidePopup());
        setLoading(false);
      }, 1000);
    }
  }

  useEffect(() => {
    if (!tokenScucess) navigate("login");
  }, [tokenScucess, navigate]);

  useEffect(() => {
    sendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="signup-page"
      className="h-screen w-screen justify-center items-center flex font-serif text-xs sm:text-sm md:text-base bg-mercury bg-login-side-bg dark:bg-login-side-dark-bg bg-center bg-cover relative"
    >
      <TopPopup />
      <div className="w-full h-full absolute backdrop-blur-[8px] 2k:backdrop-blur-[12px]"></div>
      <HomeButtonSignupPage />
      <LoginButtonOtpPage />

      <div className="login-div h-96 w-full mx-6 md:aspect-video md:min-w-[700px] md:w-2/3 md:h-auto flex flex-col bg-cs-white/20 dark:bg-cs-black/40 shadow-black-full dark:shadow-neon-full-sm md:dark:shadow-neon-full-xl backdrop-blur-[8px] 2k:backdrop-blur-[12px] rounded-2xl justify-center relative font-serif items-center gap-4 2k:gap-8">
        <form
          id="signup-div-signup-side"
          className="w-full flex flex-col items-center justify-center gap-6 2k:gap-10"
          onSubmit={handleSubmit}
        >
          <span className="text-cs-white text-2xl md:huge-login-text-res">
            Enter Your OTP
          </span>
          <input
            type="text"
            placeholder="OTP Here"
            className="normal-login-etxt-res bg-cs-white/30 rounded-full px-2 py-1 text-cs-white text-center 2k:text-2xl 4k:text-3xl md:w-1/4"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
          />
          <button
            className="min-w-[90px] max-h-[80px] w-[10%] max-w-[220px] aspect-[21/9] flex items-center justify-center login-button"
            type="submit"
          >
            <span className="login-button-span 2k:text-2xl 4k:text-3xl">
              Submit
            </span>
          </button>
        </form>
        <button
          className="min-w-[90px] max-h-[80px] w-[10%] max-w-[220px] aspect-[21/9] flex items-center justify-center login-button"
          onClick={sendOtp}
        >
          <span className="login-button-span 2k:text-2xl 4k:text-3xl">
            Resend
          </span>
        </button>
      </div>
    </div>
  );
};

export default OtpPage;

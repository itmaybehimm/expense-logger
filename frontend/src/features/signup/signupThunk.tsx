import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupFormData } from "../../interfaces/signupRelated";
import axios, { AxiosError } from "axios";

const backendURL = import.meta.env.VITE_BACKEND_API_BASE_URL;

interface KnownError {
  error_data: string;
  status: number;
}

interface SignupPayload {
  message: string;
  status: number;
}

export const signupUser = createAsyncThunk<
  // Return type of the payload creator
  SignupPayload,
  // First argument to the payload creator
  SignupFormData,
  // Types for ThunkAPI
  {
    rejectValue: KnownError;
  }
>("signup/createUser", async (signupFormData: SignupFormData, thunkApi) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const formData = Object.entries(signupFormData).reduce(
      (formData, [key, value]) => (formData.append(key, value), formData),
      new FormData()
    );

    if (signupFormData.profile_pic) {
      formData.append(
        "profile_pic",
        signupFormData.profile_pic,
        signupFormData.profile_pic?.name
      );
    }

    const request = await axios.post(
      backendURL + "/users/",
      signupFormData,
      config
    );
    const response = await request.data;
    console.log(response);
    return { message: "Account Created", status: request.status };
  } catch (error) {
    console.error(error);
    let message: string = "Unknown Error";
    let status = 500;
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.data.email) {
          message = error.response.data.email[0];
        } else if (error.response.data.username) {
          message = error.response.data.username[0];
        } else if (error.response.data.password) {
          message = error.response.data.password[0];
        } else if (error.response.data.profile_pic) {
          message = error.response.data.profile_pic[0];
        }
        status = error.response.status;
      }
    }
    return thunkApi.rejectWithValue({
      error_data: message,
      status: status,
    });
  }
});

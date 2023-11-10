import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { initialUserState } from "./authSlice";
import { User } from "../../interfaces/authRelated";
const backendURL = import.meta.env.VITE_BACKEND_API_BASE_URL;

interface UserCredential {
  username: string;
  password: string;
}

interface LoginData {
  status: number;
  token: string;
}

interface UserData {
  status: number;
  user: User;
}

interface KnownError {
  error_data: string;
  status: number;
}

export const loginUser = createAsyncThunk<
  // Return type of the payload creator
  LoginData,
  // First argument to the payload creator
  UserCredential,
  // Types for ThunkAPI
  {
    rejectValue: KnownError;
  }
>("auth/loginUser", async (userCredentials: UserCredential, thunkApi) => {
  try {
    // const formData = Object.entries(userCredentials).reduce(
    //   (formData, [key, value]) => (formData.append(key, value), formData),
    //   new FormData()
    // );

    const formData = Object.entries(userCredentials).reduce(
      (formData, [key, value]) => {
        formData.append(key, value);
        return formData;
      },
      new FormData() //intial value
    );

    const request = await axios.post(
      `${backendURL}/users/api-token-auth/`,
      formData
    );
    // we need to send status from request
    const response = await request.data;
    const token: string = response.token ? response.token : "";
    return { status: request.status, token: token };
  } catch (error) {
    if (error instanceof AxiosError) {
      const message: string = error.response?.data.non_field_errors[0];
      return thunkApi.rejectWithValue({
        status: error.response?.status || 500,
        error_data: message || "Unknown error",
      });
    } else {
      return thunkApi.rejectWithValue({
        status: 500,
        error_data: "Unknown error",
      });
    }
  }
});

export const getUser = createAsyncThunk<
  UserData,
  string,
  {
    rejectValue: KnownError;
  }
>("auth/getUser", async (token: string, thunkApi) => {
  try {
    const config = {
      headers: { Authorization: `Token ${token}` },
    };
    const request = await axios.get(`${backendURL}/users/`, config);
    const response = await request.data;
    const user: User = { ...initialUserState };
    user.id = response.id;
    user.email = response.email;
    user.username = response.username;
    user.dob = response.user_profile.dob;
    user.isVerified = response.user_profile.verified;
    user.first_name = response.first_name;
    user.last_name = response.last_name;

    return { status: request.status, user: user };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("User Error");
      console.log(error.response);
      return thunkApi.rejectWithValue({
        status: error.response?.status || 500,
        error_data: "Error while fetching user",
      });
    } else {
      return thunkApi.rejectWithValue({
        status: 500,
        error_data: "Unknown error",
      });
    }
  }
});

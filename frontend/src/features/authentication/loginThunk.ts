import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = import.meta.env.VITE_BACKEND_API_BASE_URL;

interface UserCredential {
  username: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials: UserCredential) => {
    const request = await axios.post(
      `${backendURL}/users/api-token-auth/`,
      userCredentials
    );
    // we need to send status from request
    const response = await request.data;
    return response;
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (token: string) => {
    const config = {
      headers: { Authorization: `Token ${token}` },
    };
    const request = await axios.get(`${backendURL}/users/`, config);
    const response = await request.data;
    console.log(response);
    return response;
  }
);

import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../app/store";
import { AxiosError } from "axios";
import { getUser, loginUser } from "./loginThunk";

// const backendURL = import.meta.env.VITE_BACKEND_API_BASE_URL;

interface User {
  id?: number;
  username?: string;
  email?: string;
  isVerified?: boolean;
  profilePic?: string;
  dob?: string;
}

interface LoginState {
  loading: boolean;
  user: User;
  token: string | null;
  error: string;
  tokenSuccess: boolean;
  userSuccess: boolean;
}

const initialState: LoginState = {
  loading: false,
  user: {},
  token: null,
  error: "",
  tokenSuccess: false,
  userSuccess: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //cases for logging in i.e getting auth token
      .addCase(loginUser.pending, (state: LoginState): void => {
        state.loading = true;
        state.user = {};
        state.token = null;
        state.error = "";
        state.tokenSuccess = false;
        state.userSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state: LoginState, action): void => {
        state.loading = false;
        state.token = action.payload.token;
        state.tokenSuccess = true;
      })
      .addCase(loginUser.rejected, (state: LoginState, action): void => {
        const err = action.error as AxiosError;
        state.loading = false;
        state.token = null;
        state.tokenSuccess = false;
        state.error = err.message;
      })
      //cases for getting use information using the auth token
      .addCase(getUser.pending, (state: LoginState): void => {
        state.loading = true;
        state.userSuccess = false;
      })
      .addCase(getUser.fulfilled, (state: LoginState, action): void => {
        state.loading = false;
        state.user = action.payload;
        state.userSuccess = true;
      })
      .addCase(getUser.rejected, (state: LoginState, action): void => {
        const err = action.error as AxiosError;
        state.loading = false;
        state.user = {};
        state.error = err.message;
      });
  },
});

// export const {} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../app/store";
import { getUser, loginUser } from "./loginThunk";
import { LoginState, User } from "../../interfaces/authRelated";

const storageToken = localStorage.getItem("token")
  ? (localStorage.getItem("token") as string)
  : "";

export const initialUserState: User = {
  id: 0,
  username: "",
  email: "",
  isVerified: false,
  profilePic: "",
  dob: "",
  first_name: "",
  last_name: "",
};

const initialState: LoginState = {
  loading: false,
  user: { ...initialUserState },
  token: storageToken,
  error: "",
  tokenSuccess: localStorage.getItem("token") ? true : false,
  userSuccess: false,
  status: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem("token");
      location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      //cases for logging in i.e getting auth token
      .addCase(loginUser.pending, (state: LoginState): void => {
        state.loading = true;
        state.error = "";
        state.tokenSuccess = false;
        state.status = 0;
      })
      .addCase(loginUser.fulfilled, (state: LoginState, action): void => {
        state.loading = false;
        state.token = action.payload.token ? action.payload.token : "";
        state.tokenSuccess = true;
        state.status = action.payload.status;
        state.error = "";
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state: LoginState, action): void => {
        state.loading = false;
        state.token = "";
        state.tokenSuccess = false;
        state.status = action.payload?.status || 0;
        state.error =
          action.payload?.error_data || action.error.message || "Unknown error";
      })
      //cases for getting use information using the auth token
      .addCase(getUser.pending, (state: LoginState): void => {
        state.loading = true;
        state.userSuccess = false;
      })
      .addCase(getUser.fulfilled, (state: LoginState, action): void => {
        state.loading = false;
        state.user = { ...action.payload.user };
        state.userSuccess = true;
        state.status = action.payload.status;
      })
      .addCase(getUser.rejected, (state: LoginState, action): void => {
        state.loading = false;
        state.error =
          action.payload?.error_data || action.error.message || "Unknown error";
        state.status = action.payload?.status || 500;
      });
  },
});

export const { logOut } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;

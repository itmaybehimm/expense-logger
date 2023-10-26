import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../app/store";

interface User {
  id?: number;
  username?: string;
  email?: string;
  isVerified?: boolean;
  profilePic?: string;
  dob?: string;
}

interface LoginState {
  loading: false;
  user: User;
  token: string | null;
  error: string | null;
  success: boolean;
}

const initialState: LoginState = {
  loading: false,
  user: {},
  token: null,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// export const {} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { SignupState } from "../../interfaces/signupRelated";
import { signupUser } from "./signupThunk";

const initialState: SignupState = {
  loading: false,
  error: "",
  success: false,
  status: 0,
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, () => {
        return { ...initialState, loading: true };
      })
      .addCase(signupUser.fulfilled, (state: SignupState, action) => {
        state.loading = false;
        state.error = "";
        state.success = true;
        state.status = action.payload.status;
      })
      .addCase(signupUser.rejected, (state: SignupState, action) => {
        state.loading = false;
        state.error = action.payload?.error_data || "Unknown Erro";
        state.success = false;
        state.status = action.payload?.status || 500;
      });
  },
});

export default signupSlice.reducer;

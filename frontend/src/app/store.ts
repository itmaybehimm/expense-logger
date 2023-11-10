import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import popupReducer from "../features/popup/popupslice";
import signupReducer from "../features/signup/signupSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    signup: signupReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

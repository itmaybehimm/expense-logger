import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PopupState, PopupAction } from "../../interfaces/popupRelated";

const initialState: PopupState = {
  isVisbile: false,
  status: 0,
  message: "",
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    displayPopup: (state, action: PayloadAction<PopupAction>) => {
      if (!state.isVisbile) {
        state.isVisbile = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      }
    },
    hidePopup: () => {
      return initialState;
    },
  },
});

export default popupSlice.reducer;

export const { displayPopup, hidePopup } = popupSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

const formModalSlice = createSlice({
  name: "form-modal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.showModal = true;
    },
    hideModal: (state) => {
      state.showModal = false;
    },
  },
});

export const formModalAction = formModalSlice.actions;

export default formModalSlice.reducer;

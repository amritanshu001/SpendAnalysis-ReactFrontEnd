import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banks: [],
};

const bankSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    setBanks: (state, action) => {
      state.banks = action.payload.banks.map((bank) => ({
        ...bank,
      }));
    },
    resetBanks: (state) => {
      console.log("reached reset bank reducer")
      state.banks = [];
    },
  },
});

export const banksAction = bankSlice.actions;

export default bankSlice.reducer;

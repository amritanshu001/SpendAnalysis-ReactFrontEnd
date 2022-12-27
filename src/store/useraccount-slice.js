import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAccounts: [],
};

const userAccountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setUserAccounts: (state, action) => {
      state.userAccounts = action.payload.accounts.map((account) => ({
        ...account,
      }));
    },
    resetUserAccounts: (state) => {
      state.userAccounts = [];
    },
  },
});

export const accountsAction = userAccountSlice.actions;

export default userAccountSlice.reducer;

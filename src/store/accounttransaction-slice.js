import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

const accountTransactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload.transactions.map((transaction) => ({
        ...transaction,
      }));
    },
    resetTransactions: (state) => {
      state.transactions = [];
    },
    refreshTransactions: () => {},
  },
});

export const accountTransactionsAction = accountTransactions.actions;

export default accountTransactions.reducer;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import userAccountReducer from "./useraccount-slice";
import accountTransactionReducer from "./accounttransaction-slice";

const store = configureStore({
  reducer: {
    userAuth: authReducer,
    userAccounts: userAccountReducer,
    accountTransactions: accountTransactionReducer,
  },
});

export default store;

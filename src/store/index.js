import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import userAccountReducer from "./useraccount-slice";

const store = configureStore({
  reducer: {
    userAuth: authReducer,
    userAccounts: userAccountReducer,
  },
});

export default store;

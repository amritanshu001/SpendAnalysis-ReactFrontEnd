import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import userAccountReducer from "./useraccount-slice";
import formModalReducer from "./formmodal-slice";

const store = configureStore({
  reducer: {
    userAuth: authReducer,
    userAccounts: userAccountReducer,
    formModal: formModalReducer,
  },
});

export default store;

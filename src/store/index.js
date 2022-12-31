import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import userAccountReducer from "./useraccount-slice";
import formModalReducer from "./formmodal-slice";
import banksSliceReducer from "./banks-slice";

const store = configureStore({
  reducer: {
    userAuth: authReducer,
    userAccounts: userAccountReducer,
    formModal: formModalReducer,
    banks: banksSliceReducer,
  },
});

export default store;

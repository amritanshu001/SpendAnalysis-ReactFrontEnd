import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import userAccountReducer from "./useraccount-slice";
import formModalReducer from "./formmodal-slice";
import banksSliceReducer from "./banks-slice";
import messageSliceReducer from "./message-slice";

const store = configureStore({
  reducer: {
    userAuth: authReducer,
    userAccounts: userAccountReducer,
    formModal: formModalReducer,
    banks: banksSliceReducer,
    globalMessages:messageSliceReducer
  },
});

export default store;

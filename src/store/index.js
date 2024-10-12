import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import userAccountReducer from "./useraccount-slice";
import formModalReducer from "./formmodal-slice";
import banksSliceReducer from "./banks-slice";
import messageSliceReducer from "./message-slice";
import themeModeReducer from "./theme-slice";

const store = configureStore({
  reducer: {
    userAuth: authReducer,
    userAccounts: userAccountReducer,
    formModal: formModalReducer,
    banks: banksSliceReducer,
    globalMessages: messageSliceReducer,
    themeMode: themeModeReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import { banksAction } from "./banks-slice";
import { accountsAction } from "./useraccount-slice";
import { fetchBanks } from "./banks-slice";
import { fetchAccounts } from "./useraccount-slice";
import { queryClient } from "../lib/endpoint-configs";

const initialState = {
  authToken: localStorage.getItem("token"),
  userLoggedIn: !!localStorage.getItem("loggedIn"),
  userIsAdmin: !!localStorage.getItem("admin"),
  expiresIn: localStorage.getItem("expiry"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logUserIn: (state, action) => {
      state.userLoggedIn = true;
      state.authToken = action.payload.authToken;
      state.userIsAdmin = action.payload.isAdmin;
      localStorage.setItem("token", action.payload.authToken);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("admin", action.payload.isAdmin);
      localStorage.setItem("expiry", action.payload.expiresIn);
    },
    logUserOut: (state) => {
      state.userLoggedIn = false;
      state.authToken = null;
      state.userIsAdmin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("expiry");
    },
  },
});

export const authActions = authSlice.actions;

export const logUserOutActions = () => {
  return (dispatch, getState)=>{
    
    queryClient.removeQueries()
    dispatch(banksAction.resetBanks())
    dispatch(accountsAction.resetUserAccounts())
    dispatch(authActions.logUserOut())
  }
}

export const logUserInActions = (accessToken) => {
  return (dispatch, getState) => {
    dispatch(fetchBanks(accessToken))
    dispatch(fetchAccounts(accessToken))
  }
}



export default authSlice.reducer;

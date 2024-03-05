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
  email:localStorage.getItem("email"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logUserIn: (state, action) => {
      state.userLoggedIn = true;
      state.authToken = action.payload.authToken;
      state.userIsAdmin = action.payload.isAdmin;
      state.email = action.payload.email
      localStorage.setItem("tokens", action.payload.authToken);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("admin", action.payload.isAdmin);
      localStorage.setItem("expiry", action.payload.expiresIn);
      localStorage.setItem("email", action.payload.email);
    },
    logUserOut: (state) => {
      state.userLoggedIn = false;
      state.authToken = null;
      state.userIsAdmin = false;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("expiry");
      localStorage.removeItem("email");
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

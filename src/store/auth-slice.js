import { createSlice } from "@reduxjs/toolkit";

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

export default authSlice.reducer;

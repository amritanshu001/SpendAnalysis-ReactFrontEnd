import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoggedIn: false,
  authToken: null,
  userIsAdmin: false,
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
    },
    logUserOut: (state) => {
      state.userLoggedIn = false;
      state.authToken = null;
      state.userIsAdmin = false;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

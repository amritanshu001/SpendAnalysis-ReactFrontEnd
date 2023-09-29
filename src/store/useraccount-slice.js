import { createSlice } from "@reduxjs/toolkit";
import { showAndHideMessages } from "./message-slice";
import serverResponse, {convert2AccountFormat} from "../lib/server-communication";
import apiURL from "../endpoint";

const initialState = {
  userAccounts: [],
};

const userAccountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setUserAccounts: (state, action) => {
      state.userAccounts = action.payload.accounts.map((account) => ({
        ...account,
      }));
    },
    resetUserAccounts: (state) => {
      state.userAccounts = [];
    },
  },
});

export const accountsAction = userAccountSlice.actions;

export const fetchAccounts = (accessToken) => {
  return async (dispatch) => {
    const accountsConfig = {
      url: apiURL + "/accounts",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    try {
      const accountData = await serverResponse(accountsConfig)
      dispatch(accountsAction.setUserAccounts({accounts:convert2AccountFormat(accountData)}))
    } catch(err) {
      dispatch(showAndHideMessages({
        status:"warning",
        messageText: err.message||err.msg||"Server Error while fetching accounts data"
      }))
    }
  }
}

export default userAccountSlice.reducer;

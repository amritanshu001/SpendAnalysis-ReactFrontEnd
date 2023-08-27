import { createSlice } from "@reduxjs/toolkit";
import { showAndHideMessages } from "./message-slice";
import serverResponse from "../lib/server-communication";
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
      const processedAccountData = [];
      for (let key in accountData) {
        const row = {};
        row["id"] = accountData[key].account_id;
        row.account_no = accountData[key].account_no;
        row.active = accountData[key].active;
        row.joint = accountData[key].joint;
        row.bank_name = accountData[key]["bank_dets"].bank_name;
        processedAccountData.push(row);
      }
      dispatch(accountsAction.setUserAccounts({accounts:processedAccountData}))
    } catch(err) {
      dispatch(showAndHideMessages({
        status:"warning",
        messageText: err.message||err.msg||"Server Error while fetching accounts data"
      }))
    }
  }
}

export default userAccountSlice.reducer;

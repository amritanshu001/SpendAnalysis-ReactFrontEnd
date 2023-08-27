import { createSlice } from "@reduxjs/toolkit";
import apiURL from "../endpoint";
import { showAndHideMessages } from "./message-slice";
import serverResponse from "../lib/server-communication";

const initialState = {
  banks: [],
};

const bankSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    setBanks: (state, action) => {
      state.banks = action.payload.banks.map((bank) => ({
        ...bank,
      }));
    },
    resetBanks: (state) => {
      state.banks = [];
    },
  },
});

export const banksAction = bankSlice.actions;

export const fetchBanks = (accessToken)=>{
  return async (dispatch, getState) => {
    const bankConfig = {
      url: apiURL + "/banks",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
    try {
      const bankData = await serverResponse(bankConfig)
      const processedBankData = [];
      for (let key in bankData) {
        const row = {};
        row["bal_col"] = bankData[key].bal_col;
        row["id"] = bankData[key].bank_id;
        row.bank_name = bankData[key].bank_name;
        row.chq_no_col = bankData[key].chq_no_col;
        row.crdt_amt_col = bankData[key].crdt_amt_col;
        row.start_row = bankData[key].start_row;
        row.txn_date_col = bankData[key].txn_date_col;
        row.txn_rmrk_col = bankData[key].txn_rmrk_col;
        row.val_date_col = bankData[key].val_date_col;
        row.with_amt_col = bankData[key].with_amt_col;
        row.date_format = bankData[key].date.date_format;
        processedBankData.push(row);
      }
      dispatch(banksAction.setBanks({ banks: processedBankData }))
    } catch(err) {
      dispatch(showAndHideMessages({
        status:"warning",
        messageText: err.message||err.msg||"Error while fetching bank data"
      }))
    }
  }
}



export default bankSlice.reducer;

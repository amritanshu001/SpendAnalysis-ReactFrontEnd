import { createSlice } from "@reduxjs/toolkit";
import apiURL from "../endpoint";
import { showAndHideMessages } from "./message-slice";
import serverResponse, {convert2BankFormat} from "../lib/server-communication";

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
      dispatch(banksAction.setBanks({ banks: convert2BankFormat(bankData) }))
    } catch(err) {
      dispatch(showAndHideMessages({
        status:"warning",
        messageText: err.message||err.msg||"Error while fetching bank data"
      }))
    }
  }
}



export default bankSlice.reducer;

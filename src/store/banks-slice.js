import { createSlice } from "@reduxjs/toolkit";
import apiURL from "../endpoint";
import { showAndHideMessages } from "./message-slice";
import {convert2BankFormat} from "../lib/server-communication";
import { queryClient, sendQueryRequest } from "../lib/endpoint-configs";

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
      await queryClient.fetchQuery({
        queryKey:["banks"], 
        queryFn:({signal})=>sendQueryRequest({signal, requestConfig:bankConfig}),
        staleTime:300000})

      // dispatch(banksAction.setBanks({ banks: convert2BankFormat(bankData) }))

    } catch(err) {
      dispatch(showAndHideMessages({
        status:"warning",
        messageText: err.status + ":"+err.message
      }))
    }
  }
}



export default bankSlice.reducer;

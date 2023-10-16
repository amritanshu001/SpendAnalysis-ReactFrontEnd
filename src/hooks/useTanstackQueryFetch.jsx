import React from "react";
import { useQuery } from "@tanstack/react-query";
import { sendQueryRequest } from "../lib/endpoint-configs";
const apiURL = import.meta.env.VITE_API_URL;
const datesConfig = {
  url: apiURL + "/dateformats",
};
import {
  convert2TransactionFormat,
  convert2AccountFormat,
  convert2DateFormat,
  convert2BankFormat,
} from "../lib/server-communication";

export const useFetchBanks = (
  authToken,
  enabled = true,
  staleTime = 300000
) => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: ({ signal }) => {
      const bankConfig = {
        url: apiURL + "/banks",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      return sendQueryRequest({ signal, requestConfig: bankConfig });
    },
    enabled,
    staleTime,
    select: (data) => convert2BankFormat(data),
  });
};

export const useFetchAccounts = (
  authToken,
  enabled = true,
  staleTime = 300000
) => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: ({ signal }) => {
      const accountsConfig = {
        url: apiURL + "/accounts",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      return sendQueryRequest({ signal, requestConfig: accountsConfig });
    },
    enabled,
    staleTime,
    select: (data) => convert2AccountFormat(data),
  });
};

export const useFetchDates = (enabled = true, staleTime = 300000) => {
  console.log("Reached fecth date hook", enabled, staleTime, datesConfig);
  return useQuery({
    queryKey: ["dates"],
    queryFn: ({ signal }) =>
      sendQueryRequest({ signal, requestConfig: datesConfig }),
    enabled,
    staleTime,
    select: (data) => convert2DateFormat(data),
    refetchInterval: (data) => (data ? staleTime : 1),
  });
};

export const useFetchTransactions = (
  authToken,
  accountId,
  query,
  enabled = false,
  staleTime = 300000
) => {
  return useQuery({
    queryKey: ["account", accountId],
    queryFn: ({ signal }) => {
      const transactionConfig = {
        url: apiURL + "/statement/" + accountId + query,
        method: "GET",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      return sendQueryRequest({ signal, requestConfig: transactionConfig });
    },
    enabled,
    staleTime,
    select: (data) => convert2TransactionFormat(data),
  });
};

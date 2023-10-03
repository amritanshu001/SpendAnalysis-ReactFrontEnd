import React from "react";
import { useQuery } from "@tanstack/react-query";
import { sendQueryRequest } from "../lib/endpoint-configs";
const apiURL = import.meta.env.VITE_API_URL;
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
  return useQuery({
    queryKey: ["dateformats"],
    queryFn: ({ signal }) => {
      const datesConfig = {
        url: apiURL + "/dateformats",
      };
      return sendQueryRequest({ signal, requestConfig: datesConfig });
    },
    refetchInterval: (data) => {
      return data ? 300000 : 1;
    },
    staleTime,
    enabled,
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

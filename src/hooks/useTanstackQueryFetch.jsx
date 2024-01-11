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
  convert2InactiveAccountFormat,
} from "../lib/server-communication";

export const useFetchBanks = (
  authToken,
  enabled = true,
  staleTime = 300000
) => {
  return useQuery({
    queryKey: ["banks", authToken],
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
    queryKey: ["accounts", authToken],
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
    queryKey: ["account", accountId, query, authToken],
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

export const useFetchInactiveAccounts = (
  authToken,
  enabled = true,
  staleTime = 300000
) => {
  return useQuery({
    queryKey: ["inactive-accounts", authToken],
    queryFn: ({ signal }) => {
      const inactiveAccountsConfig = {
        url: apiURL + "/admin/accounts",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      return sendQueryRequest({
        signal,
        requestConfig: inactiveAccountsConfig,
      });
    },
    enabled,
    staleTime,
    select: (data) => convert2InactiveAccountFormat(data),
  });
};

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { sendQueryRequest } from "../lib/endpoint-configs";
const apiURL = import.meta.env.VITE_API_URL;

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
  });
};

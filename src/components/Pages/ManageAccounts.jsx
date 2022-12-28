import styles from "./ManageAccounts.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
import Table from "../UI/Table/Table";

import useHttp from "../../hooks/useHTTP";
import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { accountsAction } from "../../store/useraccount-slice";

import apiURL from "../../endpoint";

const header = [
  { name: "Account#", tech_name: "account_no" },
  { name: "Bank", tech_name: "bank_name" },
  { name: "Active", tech_name: "active" },
  { name: "Joint", tech_name: "joint" },
];

const ManageAccounts = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const accountData = useSelector((state) => state.userAccounts.userAccounts);
  const dispatch = useDispatch();

  const processAccountDetails = useCallback((rawdata) => {
    const processedData = [];
    for (let key in rawdata) {
      const row = {};
      row["id"] = rawdata[key].account_id;
      row.account_no = rawdata[key].account_no;
      row.active = rawdata[key].active ? "Yes" : "No";
      row.joint = rawdata[key].joint ? "Yes" : "No";
      row.bank_name = rawdata[key]["bank_dets"].bank_name;

      processedData.push(row);
    }
    dispatch(accountsAction.setUserAccounts({ accounts: processedData }));
    // setAccountData(processedData);
  }, []);

  const {
    isloading: accountsLoading,
    error: accountsError,
    sendRequest: getUserAccounts,
    resetError: resetAccountsError,
  } = useHttp(processAccountDetails);

  useEffect(() => {
    if (accountData.length === 0) {
      const accountsConfig = {
        url: apiURL + "/accounts",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      getUserAccounts(accountsConfig);
    }
  }, [authToken, getUserAccounts, accountData]);

  let message;
  if (accountsLoading) {
    message = <p className={styles.loading}>Loading....</p>;
  }
  if (accountsError) {
    message = <p className={styles.error}>{accountsError}</p>;
  }

  if (!accountsLoading && !accountsError && accountData) {
    message = <Table header={header} body={accountData} />;
  }

  return (
    <React.Fragment>
      <Header>My Accounts</Header>
      <Container className={styles.container}>{message}</Container>
    </React.Fragment>
  );
};

export default ManageAccounts;

import styles from "./AddBank.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
import Table from "../UI/Table/Table";

import useHttp from "../../hooks/useHTTP";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { banksAction } from "../../store/banks-slice";
import apiURL from "../../endpoint";

const header = [
  { name: "Bank Name", tech_name: "bank_name" },
  { name: "Balance (col)", tech_name: "bal_col" },
  { name: "Cheque No. (col)", tech_name: "chq_no_col" },
  { name: "Credit Amount (col)", tech_name: "crdt_amt_col" },
  { name: "Date Format", tech_name: "date_format" },
  { name: "Start row", tech_name: "start_row" },
  { name: "Transaction Date (col)", tech_name: "txn_date_col" },
  { name: "Transaction Remark (col)", tech_name: "txn_rmrk_col" },
  { name: "Value Date (col)", tech_name: "val_date_col" },
  { name: "Withdrawal Amount (col)", tech_name: "with_amt_col" },
];

const AddBank = (props) => {
  const bankData = useSelector((state) => state.banks.banks);
  const authToken = useSelector((state) => state.userAuth.authToken);

  const disptach = useDispatch();

  const processBankDetails = useCallback((rawdata) => {
    const processedData = [];
    for (let key in rawdata) {
      const row = {};
      row["bal_col"] = rawdata[key].bal_col;
      row["id"] = rawdata[key].bank_id;
      row.bank_name = rawdata[key].bank_name;
      row.chq_no_col = rawdata[key].chq_no_col;
      row.crdt_amt_col = rawdata[key].crdt_amt_col;
      row.start_row = rawdata[key].start_row;
      row.txn_date_col = rawdata[key].txn_date_col;
      row.txn_rmrk_col = rawdata[key].txn_rmrk_col;
      row.val_date_col = rawdata[key].val_date_col;
      row.with_amt_col = rawdata[key].with_amt_col;
      row.date_format = rawdata[key].date.date_format;
      processedData.push(row);
    }
    disptach(banksAction.setBanks({ banks: processedData }));
  }, []);

  const {
    isloading: banksLoading,
    error: banksError,
    sendRequest: getBankDetails,
  } = useHttp(processBankDetails);

  useEffect(() => {
    if (!bankData || bankData.length === 0) {
      const bankConfig = {
        url: apiURL + "/banks",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      getBankDetails(bankConfig);
    }
  }, [getBankDetails, authToken, apiURL, bankData]);

  let message;

  if (!banksError && !banksLoading && bankData) {
    message = <Table header={header} body={bankData} editable={true} />;
  }
  if (banksLoading) {
    message = <p className={styles.loading}>Loading....</p>;
  }

  if (banksError) {
    message = <p className={styles.error}>{banksError}</p>;
  }

  return (
    <React.Fragment>
      <Header>Bank Details</Header>
      <Container className={styles.container}>{message}</Container>
    </React.Fragment>
  );
};

export default AddBank;

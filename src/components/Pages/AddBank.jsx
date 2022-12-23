import styles from "./AddBank.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
import Table from "../UI/Table/Table";

import useHttp from "../../hooks/useHTTP";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Select from "react-select";
import apiURL from "../../endpoint";

const header = [
  { name: "Balance (col)", tech_name: "bal_col" },
  { name: "Bank Name", tech_name: "bank_name" },
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
  const [bankData, setBankData] = useState(null);
  const authToken = useSelector((state) => state.userAuth.authToken);
  console.log("Token: ", authToken);

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
    setBankData(processedData);
  }, []);

  const {
    isloading: banksLoading,
    error: banksError,
    sendRequest: getBankDetails,
    resetError: resetBankError,
  } = useHttp(processBankDetails);

  useEffect(() => {
    const bankConfig = {
      url: apiURL + "/banks",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    };
    getBankDetails(bankConfig);
  }, [getBankDetails, authToken, apiURL]);

  // const [responseData, setResponseData] = useState(null);

  // const processDateFormats = useCallback((rawdata) => {
  //   const processedResponse = [];
  //   for (let key in rawdata) {
  //     processedResponse.push({
  //       value: rawdata[key].date_id,
  //       label: rawdata[key].date_format,
  //     });
  //   }
  //   setResponseData(processedResponse);
  // }, []);

  // const selectChangeHandler = (event) => {
  //   console.log(event);
  // };

  // const {
  //   sendRequest: getDateFormats,
  //   isloading,
  //   error,
  //   resetError,
  // } = useHttp(processDateFormats);

  // useEffect(() => {
  //   const dateFormatConfig = {
  //     url: apiURL + "/dateformats",
  //     method: "GET",
  //   };
  //   getDateFormats(dateFormatConfig);
  // }, [getDateFormats]);

  let message;

  if (!banksError && !banksLoading && bankData) {
    message = <Table header={header} body={bankData} />;
  }
  if (banksLoading) {
    message = <p className={styles.loading}>Loading....</p>;
  }

  if (banksError) {
    message = <p className={styles.error}>{banksError}</p>;
  }

  return (
    <React.Fragment>
      <Header>Add Bank Details</Header>
      <Container className={styles.container}>{message}</Container>
    </React.Fragment>
  );
};

export default AddBank;

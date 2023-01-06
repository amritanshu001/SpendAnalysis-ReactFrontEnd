import React, { useState, useCallback, useEffect } from "react";
import styles from "./SpendAnalysis.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
import Input from "../UI/Input";
import Table from "../UI/Table/Table";
import BalanceGrid from "../UI/Grid/BalanceGrid";

import { useSelector } from "react-redux";
import Button from "../UI/Button";

import apiURL from "../../endpoint";
import useHttp from "../../hooks/useHTTP";
import TransactionGrid from "../UI/Grid/TransactionGrid";

const summaryDetails = (current, transaction) => {
  let transactionSummary = {};
  if (transaction.deposit_amt === "") {
    transactionSummary = {
      ...current,
      outgoingSum: current.outgoingSum + transaction.withdrawal_amt,
      outgoingTxnCount: current.outgoingTxnCount + 1,
    };
  } else {
    transactionSummary = {
      ...current,
      incomingSum: current.incomingSum + transaction.deposit_amt,
      incomingTxnCount: current.incomingTxnCount + 1,
    };
  }
  return transactionSummary;
};

const mapAccounts = (account) => {
  return (
    <option key={account.id} value={account.id}>
      {account.bank_name}--{account.account_no}
    </option>
  );
};

const header = [
  { name: "Transaction Date", tech_name: "txn_date" },
  { name: "Value Date", tech_name: "value_date" },
  { name: "Cheque No.", tech_name: "cheque_no" },
  { name: "Transaction Details", tech_name: "txn_remarks" },
  { name: "Deposit Amount", tech_name: "deposit_amt" },
  { name: "Withdrawal Amount", tech_name: "withdrawal_amt" },
  { name: "Balance", tech_name: "balance" },
];

const SpendAnalysis = (props) => {
  const accounts = useSelector((state) => state.userAccounts.userAccounts);
  const authToken = useSelector((state) => state.userAuth.authToken);

  const [accountId, setAccountId] = useState(0);
  const [validation, setValidation] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [transactions, setTransactions] = useState(null);

  const processTransactions = useCallback((rawdata) => {
    const convertDates = (date) => {
      const convertDate = new Date(date);
      const options = { year: "numeric", month: "short", day: "numeric" };
      return convertDate.toLocaleString(undefined, options);
    };
    const processedData = rawdata.transactions.map((transaction) => {
      return {
        id: transaction.txn_id,
        balance: +transaction.balance,
        cheque_no: transaction.cheque_no,
        deposit_amt:
          +transaction.deposit_amt === 0 ? "" : +transaction.deposit_amt,
        txn_date: convertDates(transaction.txn_date),
        txn_remarks: transaction.txn_remarks,
        value_date: convertDates(transaction.value_date),
        withdrawal_amt:
          +transaction.withdrawal_amt === 0 ? "" : +transaction.withdrawal_amt,
      };
    });
    setTransactions(processedData);
  }, []);

  const {
    isloading: transactionsLoading,
    error: transactionsError,
    sendRequest: loadTransactions,
    resetError: resetTransactionError,
  } = useHttp(processTransactions);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (accountId === 0) {
      setValidation("Please select Account");
      return;
    }
    const dt_fromDate = new Date(fromDate);
    const dt_toDate = new Date(toDate);

    if (dt_fromDate.getTime() > dt_toDate.getTime()) {
      setValidation("From date cannot be greater than To Date");
      return;
    }

    let query = "";
    if (!fromDate && toDate) {
      query = `?to_date=${toDate}`;
    }

    if (fromDate.length > 0 && toDate.length > 0) {
      query = `?from_date=${fromDate}&to_date=${toDate}`;
    }

    if (fromDate && !toDate) {
      query = `?from_date=${fromDate}`;
    }

    setValidation(null);

    const transactionConfig = {
      url: apiURL + "/statement/" + accountId + query,
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    };
    loadTransactions(transactionConfig);
  };

  const onSelectChangeHandler = (event) => {
    setAccountId(+event.target.value);
  };

  //placeholder for more complex filteration
  let filteredTransactions = [];
  let statementSummary = {};
  let closingBal;
  let openingBal;
  let top5Credit = [];
  let top5Debit = [];
  let top5CreditShare = 0.0;
  let top5DebitShare = 0.0;

  let message;
  if (transactionsLoading) {
    message = <p className={styles.loading}>Loading....</p>;
  }
  if (transactionsError) {
    message = <p className={styles.error}>{transactionsError}</p>;
  }

  if (
    !transactionsLoading &&
    !transactionsError &&
    transactions &&
    transactions.length > 0
  ) {
    filteredTransactions = transactions.filter((transaction) => true);
    closingBal = filteredTransactions[0].balance;
    openingBal =
      filteredTransactions[filteredTransactions.length - 1].deposit_amt === ""
        ? +filteredTransactions[filteredTransactions.length - 1].balance +
          +filteredTransactions[filteredTransactions.length - 1].withdrawal_amt
        : +filteredTransactions[filteredTransactions.length - 1].balance -
          +filteredTransactions[filteredTransactions.length - 1].deposit_amt;
    statementSummary = filteredTransactions.reduce(summaryDetails, {
      outgoingSum: 0,
      outgoingTxnCount: 0,
      incomingSum: 0,
      incomingTxnCount: 0,
    });

    top5Credit = filteredTransactions
      .filter((txn) => txn.withdrawal_amt === "")
      .sort((txn1, txn2) => +txn2.deposit_amt - txn1.deposit_amt)
      .slice(0, 5);
    top5Debit = filteredTransactions
      .filter((txn) => txn.deposit_amt === "")
      .sort((txn1, txn2) => +txn2.withdrawal_amt - txn1.withdrawal_amt)
      .slice(0, 5);

    top5CreditShare = (
      (top5Credit.reduce((prev, txn) => prev + +txn.deposit_amt, 0) /
        statementSummary.incomingSum) *
      100
    ).toFixed(2);

    top5DebitShare = (
      (top5Debit.reduce((prev, txn) => prev + +txn.withdrawal_amt, 0) /
        statementSummary.outgoingSum) *
      100
    ).toFixed(2);

    message = (
      <Table header={header} body={filteredTransactions} editable={false} />
    );
  }

  if (!transactionsLoading && transactions && transactions.length === 0) {
    message = <p className={styles.error}>No records found!</p>;
  }

  // console.log("Credit Share: ", top5CreditShare, "%");
  // console.log("Debit Share: ", top5DebitShare, "%");

  const fromDateChangeHandler = (event) => {
    setFromDate(event.target.value);
  };

  const toDateChangeHandler = (event) => {
    setToDate(event.target.value);
  };

  return (
    <React.Fragment>
      <Header>Spend Analysis</Header>
      <Container className={styles.container}>
        <form className={styles.form} onSubmit={formSubmitHandler}>
          <div className={styles.select}>
            <label>Select Account</label>
            <select onChange={onSelectChangeHandler}>
              <option value={0}>---</option>
              {accounts.map(mapAccounts)}
            </select>
          </div>
          <div className={styles.dates}>
            <Input
              id="frm_date"
              type="date"
              name="frm_date"
              value={fromDate}
              onChange={fromDateChangeHandler}
            >
              From Date
            </Input>
            <Input
              id="to_date"
              type="date"
              name="to_date"
              value={toDate}
              onChange={toDateChangeHandler}
            >
              To Date
            </Input>
          </div>
          <div className={styles.actions}>
            <Button>Fetch Transactions</Button>
          </div>
          {validation && <p className={styles.error}>{validation}</p>}
        </form>
      </Container>
      {filteredTransactions.length > 0 && (
        <div className={styles.summary}>
          <BalanceGrid openingBal={openingBal} closingBal={closingBal} />
          <TransactionGrid summary={statementSummary} />
        </div>
      )}
      <div className={styles.display}>
        <div className={styles.results}>{message}</div>
      </div>
    </React.Fragment>
  );
};

export default SpendAnalysis;

import React, { useState, useCallback } from "react";
import styles from "./SpendAnalysis.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
import Input from "../UI/Input";
import BalanceGrid from "../UI/Grid/BalanceGrid";
import SpendChart from "../UI/Chart/SpendChart";
import Button from "../UI/Button";
import TransactionGrid from "../UI/Grid/TransactionGrid";
import SpinnerCircular from "../UI/Feedback/SpinnerCircular";
import DisplayGrid from "../UI/MUI Grid/DisplayGrid";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import apiURL from "../../endpoint";
import useHttp from "../../hooks/useHTTP";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

//placeholder for more complex filteration
let filteredTransactions = [];
let statementSummary = {};
let closingBal;
let openingBal;
let top5Credit = [];
let top5Debit = [];
let top5CreditShare = 0.0;
let top5DebitShare = 0.0;
let spendChart;
let message1;

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

const convert2Date = (params) => {
  const newDate = new Date(params.row.txn_date);
  return newDate;
};

const mapAccounts = (account) => {
  return (
    <option key={account.id} value={account.id}>
      {account.bank_name}--{account.account_no}
    </option>
  );
};

function uniqBy(a, key) {
  var seen = {};
  return a.filter(function (item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
}

const sortByDate = (txn1, txn2) => {
  const txn2Date = new Date(txn2.txn_date);
  const txn1Date = new Date(txn1.txn_date);
  if (txn1Date.getTime() === txn2Date.getTime()) {
    return txn1.id - txn2.id;
  }
  return txn1Date.getTime() - txn2Date.getTime();
};

const txnCols = [
  {
    headerName: "Transaction Date",
    field: "txn_date",
    minWidth: 120,
    flex: 1,
    type: "date",
    valueGetter: convert2Date,
    headerClassName: "table__header",
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Value Date",
    field: "value_date",
    minWidth: 120,
    flex: 1,
    type: "date",
    valueGetter: convert2Date,
    headerClassName: "table__header",
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Cheque No.",
    field: "cheque_no",
    minWidth: 60,
    flex: 1,
    headerClassName: "table__header",
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Transaction Details",
    field: "txn_remarks",
    minWidth: 500,
    flex: 1,
    headerClassName: "table__header",
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Deposit Amount(Rs.)",
    field: "deposit_amt",
    minWidth: 120,
    flex: 1,
    type: "number",
    headerClassName: "table__header",
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Withdrawal Amount(Rs.)",
    field: "withdrawal_amt",
    minWidth: 120,
    flex: 1,
    type: "number",
    headerClassName: "table__header",
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Balance(Rs.)",
    field: "balance",
    minWidth: 120,
    flex: 1,
    type: "number",
    headerClassName: "table__header",
    headerAlign: "center",
    align: "center",
  },
];

const SpendAnalysis = (props) => {
  const accounts = useSelector((state) => state.userAccounts.userAccounts);
  const authToken = useSelector((state) => state.userAuth.authToken);
  const location = useLocation();

  const [accountId, setAccountId] = useState(0);
  const [validation, setValidation] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [transactions, setTransactions] = useState([]);

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

  if (transactionsLoading) {
    message1 = <SpinnerCircular color="success" />;
  }
  if (transactionsError) {
    message1 = <p className={styles.error}>{transactionsError}</p>;
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

    let monthYears = filteredTransactions.map((txn) => {
      const txnDate = new Date(txn.txn_date);
      return {
        month: txnDate.getMonth(),
        year: txnDate.getFullYear(),
      };
    });
    let uniqueMonthYears = uniqBy(monthYears, JSON.stringify);

    let chartData = uniqueMonthYears.map((monthYear) => {
      const chartItem = {};
      const dateFilteredTxns = filteredTransactions
        .filter((txn) => {
          const convertTxnDate = new Date(txn.txn_date);
          return (
            convertTxnDate.getFullYear() === monthYear.year &&
            convertTxnDate.getMonth() === monthYear.month
          );
        })
        .sort(sortByDate);

      chartItem.date = monthYear;
      chartItem.closingBal =
        dateFilteredTxns[dateFilteredTxns.length - 1].balance;

      chartItem.openingBal =
        dateFilteredTxns[0].deposit_amt === ""
          ? +dateFilteredTxns[0].balance + +dateFilteredTxns[0].withdrawal_amt
          : +dateFilteredTxns[0].balance - +dateFilteredTxns[0].deposit_amt;

      chartItem.incoming = dateFilteredTxns
        .filter((txn) => {
          return txn.withdrawal_amt === "";
        })
        .reduce((prev, curr) => {
          return prev + +curr.deposit_amt;
        }, 0);

      chartItem.outgoing = dateFilteredTxns
        .filter((txn) => {
          return txn.deposit_amt === "";
        })
        .reduce((prev, curr) => {
          return prev + +curr.withdrawal_amt;
        }, 0);

      return chartItem;
    });
    if (chartData.length > 0) {
      spendChart = (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontWeight="bold" fontSize={20} fontFamily="inherit">
              Spend Trend
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SpendChart
              chartData={chartData.sort((date1, date2) => {
                return (
                  date1.date.year * 100 +
                  date1.date.month -
                  (date2.date.year * 100 + date2.date.month)
                );
              })}
            />
          </AccordionDetails>
        </Accordion>
      );
    }
    message1 = (
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight="bold" fontSize={20} fontFamily="inherit">
            Transaction Details
          </Typography>
        </AccordionSummary>
        <DisplayGrid
          rows={filteredTransactions.sort(sortByDate)}
          columns={txnCols}
          loading={transactionsLoading}
          boxWidth="90%"
        />
      </Accordion>
    );
  }

  const fromDateChangeHandler = (event) => {
    setFromDate(event.target.value);
  };

  const toDateChangeHandler = (event) => {
    setToDate(event.target.value);
  };

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontWeight={"bold"} fontSize={20} fontFamily="inherit">
              Summary
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.summary}>
              <BalanceGrid openingBal={openingBal} closingBal={closingBal} />
              <TransactionGrid summary={statementSummary} />
            </div>
          </AccordionDetails>
        </Accordion>
      )}
      {spendChart}
      {message1}
    </React.Fragment>
  );
};

export default SpendAnalysis;

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
import { AnimatePresence, motion } from "framer-motion";
import RefetchIcon from "../UI/Refetch/RefetchIcon";
import MUIAccordion from "../UI/MUIAccordian/Accordian";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  useFetchTransactions,
  useFetchAccounts,
} from "../../hooks/useTanstackQueryFetch";
import { convert2AccountFormat } from "../../lib/server-communication";

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

const AnimatedAccordinan = motion(Accordion);

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
  const authToken = useSelector((state) => state.userAuth.authToken);
  const location = useLocation();

  const [accountId, setAccountId] = useState(0);
  const [validation, setValidation] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { data: accounts, refetch: refetchAccounts } =
    useFetchAccounts(authToken);

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

  const {
    data: transactions,
    isError: isTransactionLoadError,
    error: transactionLoadError,
    isSuccess: isTransactionLoadSuccess,
    isLoading: isTransactionsLoading,
    refetch: getTransactions,
  } = useFetchTransactions(authToken, accountId, query, false, "Infinity");

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
    setValidation(null);
    getTransactions();
  };

  const onSelectChangeHandler = (event) => {
    setAccountId(+event.target.value);
  };

  if (isTransactionsLoading) {
    message1 = <SpinnerCircular color="success" />;
  }
  if (isTransactionLoadError) {
    message1 = (
      <p className={styles.error}>
        {transactionLoadError.status + ":" + transactionLoadError.message}
      </p>
    );
  }

  if (isTransactionLoadSuccess && transactions.length === 0) {
    message1 = <div className="centered">No records Found</div>;
  }

  if (isTransactionLoadSuccess && transactions.length > 0) {
    // transactions = transactions.filter((transaction) => true);

    closingBal = transactions[0].balance;
    openingBal =
      transactions[transactions.length - 1].deposit_amt === ""
        ? +transactions[transactions.length - 1].balance +
          +transactions[transactions.length - 1].withdrawal_amt
        : +transactions[transactions.length - 1].balance -
          +transactions[transactions.length - 1].deposit_amt;

    statementSummary = transactions.reduce(summaryDetails, {
      outgoingSum: 0,
      outgoingTxnCount: 0,
      incomingSum: 0,
      incomingTxnCount: 0,
    });

    top5Credit = transactions
      .filter((txn) => txn.withdrawal_amt === "")
      .sort((txn1, txn2) => +txn2.deposit_amt - +txn1.deposit_amt)
      .slice(0, 5);
    top5Debit = transactions
      .filter((txn) => txn.deposit_amt === "")
      .sort((txn1, txn2) => +txn2.withdrawal_amt - +txn1.withdrawal_amt)
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

    let monthYears = transactions.map((txn) => {
      const txnDate = new Date(txn.txn_date);
      return {
        month: txnDate.getMonth(),
        year: txnDate.getFullYear(),
      };
    });
    let uniqueMonthYears = uniqBy(monthYears, JSON.stringify);

    let chartData = uniqueMonthYears.map((monthYear) => {
      const chartItem = {};
      const dateFilteredTxns = transactions
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
    // if (chartData.length > 0) {
    //   spendChart = (
    //     <MUIAccordion key="trend" title="Spend Chart">
    //       <SpendChart
    //         chartData={chartData.sort((date1, date2) => {
    //           return (
    //             date1.date.year * 100 +
    //             date1.date.month -
    //             (date2.date.year * 100 + date2.date.month)
    //           );
    //         })}
    //       />
    //     </MUIAccordion>
    //   );
    // }
    // message1 = (
    //   <MUIAccordion
    //     expanded={true}
    //     key="transactions"
    //     title="Transaction Details"
    //   >
    //     <DisplayGrid
    //       rows={transactions.sort(sortByDate)}
    //       columns={txnCols}
    //       loading={isTransactionsLoading}
    //       boxWidth="90%"
    //     />
    //   </MUIAccordion>
    // );
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
      <Container
        className={styles.container}
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
      >
        <form className={styles.form} onSubmit={formSubmitHandler}>
          <div className={styles.select}>
            <label>Select Account</label>
            <div className={styles.refetch}>
              <select onChange={onSelectChangeHandler}>
                <option value={0}>---</option>
                {accounts && accounts.length > 0 && accounts.map(mapAccounts)}
              </select>
              <RefetchIcon
                onClick={refetchAccounts}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </div>
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
            <Button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Fetch Transactions
            </Button>
          </div>
          {validation && <p className={styles.error}>{validation}</p>}
        </form>
      </Container>

      <AnimatePresence>
        {isTransactionLoadSuccess && transactions.length > 0 && (
          <>
            <MUIAccordion key="balance" title="Summary">
              <div className={styles.summary}>
                <BalanceGrid openingBal={openingBal} closingBal={closingBal} />
                <TransactionGrid summary={statementSummary} />
              </div>
            </MUIAccordion>
            <MUIAccordion key="trend" title="Spend Chart">
              <SpendChart
                chartData={chartData.sort((date1, date2) => {
                  return (
                    date1.date.year * 100 +
                    date1.date.month -
                    (date2.date.year * 100 + date2.date.month)
                  );
                })}
              />
            </MUIAccordion>
            <MUIAccordion
              expanded={true}
              key="transactions"
              title="Transaction Details"
            >
              <DisplayGrid
                rows={transactions.sort(sortByDate)}
                columns={txnCols}
                loading={isTransactionsLoading}
                boxWidth="90%"
              />
            </MUIAccordion>
          </>
        )}
      </AnimatePresence>
      {message1}
    </React.Fragment>
  );
};

export default SpendAnalysis;

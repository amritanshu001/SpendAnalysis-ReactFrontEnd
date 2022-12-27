import React from "react";
import styles from "./SpendAnalysis.module.css";

import Container from "../UI/Container";
import Header from "../UI/Header";
import Input from "../UI/Input";

import { useSelector } from "react-redux";
import Button from "../UI/Button";

const SpendAnalysis = () => {
  const accounts = useSelector((state) => state.userAccounts.userAccounts);

  const mapAccounts = (account) => {
    return (
      <option key={account.id} value={account.id}>
        {account.bank_name}--{account.account_no}
      </option>
    );
  };

  return (
    <React.Fragment>
      <Header>Spend Analysis</Header>
      <Container className={styles.container}>
        <form className={styles.form}>
          <div className={styles.select}>
            <label>Select Account</label>
            <select>
              <option value={0}>---</option>
              {accounts.map(mapAccounts)}
            </select>
          </div>
          <div className={styles.dates}>
            <Input id="frm_date" type="date" name="frm_date">
              From Date
            </Input>
            <Input id="to_date" type="date" name="to_date">
              To Date
            </Input>
          </div>
          <div className={styles.actions}>
            <Button>Fetch Transactions</Button>
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default SpendAnalysis;

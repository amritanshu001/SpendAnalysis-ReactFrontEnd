import React, { useState } from "react";
import styles from "./CreateAccountForm.module.css";

import { useSelector } from "react-redux";

const mapBanks = (bank) => {
  return (
    <option key={bank.id} value={bank.id}>
      {bank.bank_name}
    </option>
  );
};

const CreateAccountForm = (props) => {
  const banks = useSelector((state) => state.banks.banks);

  const [selectedBankId, setSelectedBankId] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountJoint, setAccountJoint] = useState(false);
  const [validation, setValidation] = useState(null);

  const selectChangeHandler = (event) => {
    setSelectedBankId(event.target.value);
  };

  const jointChangeHandler = (event) => {
    setAccountJoint(event.target.checked);
  };

  const changeAccountNumberHandler = (event) => {
    setAccountNumber(event.target.value);
  };

  const addAccountHandler = (event) => {
    event.preventDefault();

    //validation

    if (accountNumber.length === 0) {
      setValidation("Account Number cannot be blank");
      return;
    }
    if (selectedBankId === 0) {
      setValidation("Please sent a Bank");
      return;
    }

    setValidation(null);
    props.onCreate(selectedBankId, accountNumber, accountJoint);
  };

  return (
    <form className={styles.form} onSubmit={addAccountHandler}>
      <div className={styles.readonly}>
        <label>Account#</label>
        <input
          type="text"
          onChange={changeAccountNumberHandler}
          value={accountNumber}
        />
      </div>
      <div className={styles.readonly}>
        <label htmlFor="bank_name">Bank Name</label>
        <select
          id="bank_name"
          value={selectedBankId}
          onChange={selectChangeHandler}
        >
          <option value={0}>---</option>
          {banks.map(mapBanks)}
        </select>
      </div>
      <div className={styles.checkbox}>
        <div>
          <input
            type="checkbox"
            checked={accountJoint}
            onChange={jointChangeHandler}
          ></input>
          <label>Joint</label>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">
          {props.loading ? "Creating..." : "Create Account"}
        </button>
      </div>
      {props.error && <p>{props.error}</p>}
    </form>
  );
};

export default CreateAccountForm;

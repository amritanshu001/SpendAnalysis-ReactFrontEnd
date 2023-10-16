import React, { useState } from "react";
import styles from "./CreateCopyBankForm.module.css";
import Input from "../UI/Input";
import Header from "../UI/Header";
import SpinnerCircular from "../UI/Feedback/SpinnerCircular";

import Select from "react-select";
import { useFetchDates } from "../../hooks/useTanstackQueryFetch";

import useInputValidator from "../../hooks/useInputValidator";
import {
  isFieldBlank,
  isIntegerNumber,
  isValidSelected,
} from "../../lib/validators";

const CreateCopyBankForm = (props) => {
  const [dateformats, setDateformats] = useState(
    "creating" in props
      ? 0
      : { value: props.payload.date_id, label: props.payload.date_format }
  );

  const {
    data: fetchedDates,
    isError,
    isLoading,
    isPending,
    isSuccess,
  } = useFetchDates(true);

  console.log(
    "Fetched Dates",
    fetchedDates,
    isError,
    isLoading,
    isPending,
    isSuccess
  );

  const {
    inputValue: bankName,
    inputIsValid: bankNameValid,
    isError: bankNameError,
    inputBlurHandler: bankNameBlurHandler,
    inputChangeHandler: bankNameChangeHandler,
    resetInput: resetBankName,
  } = useInputValidator(
    isFieldBlank,
    "creating" in props ? "" : props.payload.bank_name
  );

  const {
    inputValue: balance,
    inputIsValid: balanceValid,
    isError: balanceError,
    inputBlurHandler: balanceBlurHandler,
    inputChangeHandler: balanceChangeHandler,
    resetInput: resetBalance,
  } = useInputValidator(
    isIntegerNumber,
    "creating" in props ? "" : props.payload.bal_col
  );

  const {
    inputValue: cheque,
    inputIsValid: chequeValid,
    isError: chequeError,
    inputBlurHandler: chequeBlurHandler,
    inputChangeHandler: chequeChangeHandler,
    resetInput: resetCheque,
  } = useInputValidator(
    isIntegerNumber,
    "creating" in props ? "" : props.payload.chq_no_col
  );

  const {
    inputValue: credit,
    inputIsValid: creditValid,
    isError: creditError,
    inputBlurHandler: creditBlurHandler,
    inputChangeHandler: creditChangeHandler,
    resetInput: resetCredit,
  } = useInputValidator(
    isIntegerNumber,
    "creating" in props ? "" : props.payload.crdt_amt_col
  );

  const {
    inputValue: start,
    inputIsValid: startValid,
    isError: startError,
    inputBlurHandler: startBlurHandler,
    inputChangeHandler: startChangeHandler,
    resetInput: resetStart,
  } = useInputValidator(
    isIntegerNumber,
    "creating" in props ? "" : props.payload.start_row
  );

  const {
    inputValue: transaction,
    inputIsValid: transactionValid,
    isError: transactionError,
    inputBlurHandler: transactionBlurHandler,
    inputChangeHandler: transactionChangeHandler,
    resetInput: resetTransaction,
  } = useInputValidator(
    isIntegerNumber,
    "creating" in props ? "" : props.payload.txn_date_col
  );

  const {
    inputValue: remarks,
    inputIsValid: remarksValid,
    isError: remarksError,
    inputBlurHandler: remarksBlurHandler,
    inputChangeHandler: remarksChangeHandler,
    resetInput: resetRemarks,
  } = useInputValidator(
    isIntegerNumber,
    "creating" in props ? "" : props.payload.txn_rmrk_col
  );

  const {
    inputValue: value,
    inputIsValid: valueValid,
    isError: valueError,
    inputBlurHandler: valueBlurHandler,
    inputChangeHandler: valueChangeHandler,
    resetInput: resetValue,
  } = useInputValidator(
    isIntegerNumber,
    "creating" in props ? "" : props.payload.val_date_col
  );

  const {
    inputValue: withdrawal,
    inputIsValid: withdrawalValid,
    isError: withdrawalError,
    inputBlurHandler: withdrawalBlurHandler,
    inputChangeHandler: withdrawalChangeHandler,
    resetInput: resetWithdrawal,
  } = useInputValidator(
    isIntegerNumber,
    "creating" in props ? "" : props.payload.with_amt_col
  );

  const dateformatChangeHandler = (event) => {
    setDateformats(event);
  };

  let buttonProcessing;
  let buttonProcessed;
  if ("creating" in props) {
    buttonProcessing = "Creating...";
    buttonProcessed = "Create Bank";
  }

  if ("editing" in props) {
    buttonProcessing = "Changing...";
    buttonProcessed = "Change Bank";
  }

  if ("copying" in props) {
    buttonProcessing = "Copying...";
    buttonProcessed = "Copy & Create Bank";
  }

  let options = [];
  if (isSuccess) {
    options = fetchedDates.map((date) => {
      return {
        value: date.id,
        label: date.date_format,
      };
    });
  }

  const resetHandler = () => {
    setDateformats(
      "creating" in props
        ? 0
        : { value: props.payload.id, label: props.payload.date_format }
    );
    resetBalance();
    resetBankName();
    resetRemarks();
    resetCheque();
    resetBalance();
    resetCredit();
    resetStart();
    resetValue();
    resetTransaction();
    resetWithdrawal();
  };

  let formIsValid =
    dateformats &&
    bankNameValid &&
    balanceValid &&
    withdrawalValid &&
    valueValid &&
    transactionValid &&
    remarksValid &&
    startValid &&
    creditValid &&
    chequeValid;

  const bankFormSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const bankData = {
      bal_col: +balance,
      bank_name: bankName,
      chq_no_col: +cheque,
      crdt_amt_col: +credit,
      date_id: dateformats.value,
      start_row: +start,
      txn_date_col: +transaction,
      txn_rmrk_col: +remarks,
      val_date_col: +value,
      with_amt_col: +withdrawal,
      id: "creating" in props ? "" : props.payload.id,
    };
    props.onSave(bankData);
  };

  return (
    <React.Fragment>
      <Header>{buttonProcessed}</Header>
      <form className={styles.form} onSubmit={bankFormSubmitHandler}>
        <div className={styles.readonly}>
          <Input
            type="text"
            name="bankname"
            id="bankname"
            value={bankName}
            onBlur={bankNameBlurHandler}
            onChange={bankNameChangeHandler}
            className={bankNameError ? styles.inputerror : ""}
          >
            Bank Name
          </Input>
        </div>
        <div className={styles.dateformat}>
          <label htmlFor="dateformats">Date Format</label>
          <Select
            className={styles.reactselect}
            value={dateformats}
            isClearable={true}
            isSearchable={true}
            onChange={dateformatChangeHandler}
            options={options}
          />
          {isLoading && <SpinnerCircular color="warning" />}
        </div>
        <div className={styles.entrycols}>
          <Input
            value={start}
            onBlur={startBlurHandler}
            onChange={startChangeHandler}
            type="number"
            name="start_row"
            id="start_row"
            className={startError ? styles.inputerror : ""}
          >
            Starting from [row]
          </Input>
          <Input
            value={value}
            onBlur={valueBlurHandler}
            onChange={valueChangeHandler}
            type="number"
            name="value-date"
            id="value-date"
            className={valueError ? styles.inputerror : ""}
          >
            Value Date [col]
          </Input>
        </div>
        <div className={styles.entrycols}>
          <Input
            type="number"
            value={transaction}
            onBlur={transactionBlurHandler}
            onChange={transactionChangeHandler}
            name="txn-date"
            id="txn-date"
            className={transactionError ? styles.inputerror : ""}
          >
            Transaction Date [col]
          </Input>
          <Input
            type="number"
            value={cheque}
            onBlur={chequeBlurHandler}
            onChange={chequeChangeHandler}
            name="cheque"
            id="cheque"
            className={chequeError ? styles.inputerror : ""}
          >
            Cheque No. [col]
          </Input>
        </div>
        <div className={styles.entrycols}>
          <Input
            type="number"
            value={credit}
            onBlur={creditBlurHandler}
            onChange={creditChangeHandler}
            name="credit"
            id="credit"
            className={creditError ? styles.inputerror : ""}
          >
            Credit Amount [col]
          </Input>
          <Input
            type="number"
            value={withdrawal}
            onBlur={withdrawalBlurHandler}
            onChange={withdrawalChangeHandler}
            name="withdrawal"
            id="withdrawal"
            className={withdrawalError ? styles.inputerror : ""}
          >
            Withdrawl Amount [col]
          </Input>
        </div>
        <div className={styles.entrycols}>
          <Input
            type="number"
            value={balance}
            onBlur={balanceBlurHandler}
            onChange={balanceChangeHandler}
            name="balance"
            id="balance"
            className={balanceError ? styles.inputerror : ""}
          >
            Balance [col]
          </Input>
          <Input
            type="number"
            value={remarks}
            onBlur={remarksBlurHandler}
            onChange={remarksChangeHandler}
            name="remarks"
            id="remarks"
            className={remarksError ? styles.inputerror : ""}
          >
            Remarks [col]
          </Input>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="button" onClick={resetHandler}>
            Reset
          </button>
          <button type="submit" disabled={!formIsValid}>
            {props.loading ? buttonProcessing : buttonProcessed}
          </button>
        </div>
      </form>
      {props.isError && (
        <div className={styles["server-error"]}>
          {props.error.status + ": " + props.error.message}
        </div>
      )}
    </React.Fragment>
  );
};

export default CreateCopyBankForm;

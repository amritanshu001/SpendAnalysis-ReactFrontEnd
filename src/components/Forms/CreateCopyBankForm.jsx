import React, { useState } from "react";
import { NewInput } from "../UI/Input";
import SpinnerCircular from "../UI/Feedback/SpinnerCircular";

import { useFetchDates } from "../../hooks/useTanstackQueryFetch";
import RefetchIcon from "../UI/Refetch/RefetchIcon";

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  Stack,
} from "@mui/material";
import MUISelect from "../UI/MUISelect/MUISelect";
import Box from "../UI/Box/MUIBox";
import Button from "../UI/Button";

import useInputValidator from "../../hooks/useInputValidator";
import {
  isFieldBlank,
  isIntegerNumber,
  isValidSelected,
} from "../../lib/validators";

const CreateCopyBankForm = (props) => {
  const [dateformats, setDateformats] = useState(
    "creating" in props ? "" : props.payload.date_id
  );

  const {
    data: fetchedDates,
    isError,
    error: dateFecthError,
    isLoading,
    isPending,
    isSuccess,
    refetch: refetchDates,
  } = useFetchDates(true);

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
    setDateformats(event.target.value);
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

  const resetHandler = () => {
    setDateformats("creating" in props ? "" : props.payload.id);
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
    dateformats !== "" &&
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
      date_id: dateformats,
      start_row: +start,
      txn_date_col: +transaction,
      txn_rmrk_col: +remarks,
      val_date_col: +value,
      with_amt_col: +withdrawal,
      id: "creating" in props ? 0 : props.payload.id,
    };
    props.onSave(bankData);
  };

  return (
    <React.Fragment>
      <Box
        component="form"
        onSubmit={bankFormSubmitHandler}
        sx={{
          "& .MuiDialogContent-root": {
            display: "flex",
            flexDirection: "column",
            gap: 2,
            paddingTop: 1,
          },
        }}
      >
        <DialogTitle variant="h4">{buttonProcessed}</DialogTitle>
        <DialogContent>
          <NewInput
            type="text"
            name="bankname"
            id="bankname"
            label="Bank Name"
            value={bankName}
            onBlur={bankNameBlurHandler}
            onChange={bankNameChangeHandler}
            error={bankNameError}
            // className={bankNameError ? styles.inputerror : ""}
          />

          <Stack direction={"row"} justifyContent={"flex-start"} gap={4}>
            <MUISelect
              label="Date Format"
              error={isError}
              errorText={dateFecthError}
              onChange={dateformatChangeHandler}
              value={dateformats}
              id="date-select"
              list={
                fetchedDates && fetchedDates.length > 0
                  ? fetchedDates.map((date) => ({
                      id: date.id,
                      displayName: date.date_format,
                    }))
                  : []
              }
            />
            {isLoading && <SpinnerCircular color="warning" size="2rem" />}
            <RefetchIcon
              onClick={refetchDates}
              whileHover={{ rotate: 360, scale: 1.3 }}
              transition={{ duration: 0.5 }}
            />
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <NewInput
              value={start}
              onBlur={startBlurHandler}
              onChange={startChangeHandler}
              type="number"
              name="start_row"
              id="start_row"
              error={startError}
              label={"Starting from [row]"}
            />
            <NewInput
              value={value}
              onBlur={valueBlurHandler}
              onChange={valueChangeHandler}
              type="number"
              name="value-date"
              id="value-date"
              label="Value Date [col]"
              error={valueError}
            />
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <NewInput
              type="number"
              value={transaction}
              onBlur={transactionBlurHandler}
              onChange={transactionChangeHandler}
              name="txn-date"
              id="txn-date"
              error={transactionError}
              label="Transaction Date [col]"
            />
            <NewInput
              type="number"
              value={cheque}
              onBlur={chequeBlurHandler}
              onChange={chequeChangeHandler}
              name="cheque"
              id="cheque"
              error={chequeError}
              label="Cheque No. [col]"
            />
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <NewInput
              type="number"
              value={credit}
              onBlur={creditBlurHandler}
              onChange={creditChangeHandler}
              name="credit"
              id="credit"
              error={creditError}
              label="Credit Amount [col]"
            />

            <NewInput
              type="number"
              value={withdrawal}
              onBlur={withdrawalBlurHandler}
              onChange={withdrawalChangeHandler}
              name="withdrawal"
              id="withdrawal"
              error={withdrawalError}
              label="Withdrawl Amount [col]"
            />
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <NewInput
              type="number"
              value={balance}
              onBlur={balanceBlurHandler}
              onChange={balanceChangeHandler}
              name="balance"
              id="balance"
              error={balanceError}
              label="Balance [col]"
            />
            <NewInput
              type="number"
              value={remarks}
              onBlur={remarksBlurHandler}
              onChange={remarksChangeHandler}
              name="remarks"
              id="remarks"
              error={remarksError}
              label="Remarks [col]"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            disabled={!formIsValid}
            icon={props.icon}
            loading={props.loading}
          >
            {props.loading ? buttonProcessing : buttonProcessed}
          </Button>

          <Button type="button" onClick={resetHandler} variant="outlined">
            Reset
          </Button>
          <Button
            type="button"
            onClick={props.onCancel}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Box>
      {props.isError && (
        <Alert severity="error">
          {props.error.status + ": " + props.error.message}
        </Alert>
      )}
    </React.Fragment>
  );
};

export default CreateCopyBankForm;

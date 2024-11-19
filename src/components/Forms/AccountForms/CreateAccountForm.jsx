import React, { useState } from "react";
import styles from "./CreateAccountForm.module.css";

import { useSelector } from "react-redux";

import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../../lib/endpoint-configs";
import { queryClient } from "../../../lib/endpoint-configs";
import { useFetchBanks } from "../../../hooks/useTanstackQueryFetch";
import RefetchIcon from "../../UI/Refetch/RefetchIcon";
import Header from "../../UI/Header";
import Box from "../../UI/Box/MUIBox";
import Button from "../../UI/Button";
import { NewInput } from "../../UI/Input";
import Select from "../../UI/MUISelect/MUISelect";
import { motion } from "framer-motion";

import FormModal from "../../UI/Modal/FormModal";
import {
  DialogActions,
  DialogContent,
  Stack,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";

const apiURL = import.meta.env.VITE_API_URL;

const mapBanks = (bank) => {
  return (
    <option key={bank.id} value={bank.id}>
      {bank.bank_name}
    </option>
  );
};

const CreateAccountForm = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const { data: banks, refetch: refetchBanks } = useFetchBanks(authToken);

  const {
    mutate: createNewAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts", authToken] });
      props.onCancel();
    },
  });

  const [selectedBankId, setSelectedBankId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountJoint, setAccountJoint] = useState(false);
  const [inputValidation, setInputValidation] = useState(null);
  const [selectValidation, setSelectValidation] = useState(null);

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
      setInputValidation("Account Number cannot be blank");
      setSelectValidation(null);
      return;
    }
    if (selectedBankId === "") {
      setSelectValidation("Please select a Bank");
      setInputValidation(null);
      return;
    }

    setSelectValidation(null);
    setInputValidation(null);

    const newAccountConfig = {
      url: apiURL + "/accounts",
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        joint: accountJoint,
        bank: selectedBankId,
        account_no: accountNumber,
      }),
    };
    createNewAccount({ requestConfig: newAccountConfig });
  };

  return (
    <>
      <FormModal onBackdropClick={props.onCancel}>
        <Box
          component="form"
          onSubmit={addAccountHandler}
          sx={{
            p: 2,
            "& .MuiDialogContent-root": {
              display: "flex",
              flexDirection: "column",
              gap: 2,
              paddingTop: 1,
            },
          }}
        >
          <DialogTitle variant="h4">Add New Account</DialogTitle>
          <DialogContent>
            <NewInput
              type="text"
              onChange={changeAccountNumberHandler}
              value={accountNumber}
              label="Account #"
              sx={{ width: "60%" }}
              error={!!inputValidation}
              errorText={inputValidation}
            />
            <Stack direction={"row"} gap={2}>
              <Select
                id="bank_name"
                value={selectedBankId}
                onChange={selectChangeHandler}
                error={!!selectValidation}
                errorText={selectValidation}
                label={"Bank Name"}
                list={
                  banks && banks.length > 0
                    ? banks.map((bank) => ({
                        ...bank,
                        displayName: bank.bank_name,
                      }))
                    : []
                }
              />
              <RefetchIcon
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                onClick={refetchBanks}
                sx={{
                  fontWeight: "bold",
                  color: "secondary.main",
                }}
              />
              {/* </div> */}
            </Stack>
            <FormControlLabel
              label="Joint Account"
              control={
                <Checkbox
                  size="large"
                  onChange={jointChangeHandler}
                  checked={accountJoint}
                  color="secondary"
                />
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              transition={{ type: "spring", stiffness: 500 }}
              whileHover={{
                scale: 1.1,
              }}
            >
              {isPending ? "Creating..." : "Create Account"}
            </Button>
            <Button
              whileHover={{
                backgroundColor: "#ab003c",
                scale: 1.1,
                border: "1px solid #ab003c",
              }}
              transition={{ type: "spring", stiffness: 500 }}
              type="button"
              onClick={props.onCancel}
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
          </DialogActions>
          {isError && (
            <Alert severity="error">{error.status + ":" + error.message}</Alert>
          )}
        </Box>
      </FormModal>
    </>
  );
};

export default CreateAccountForm;

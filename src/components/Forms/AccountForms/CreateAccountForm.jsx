import React, { useState } from "react";
import styles from "./CreateAccountForm.module.css";

import { useSelector } from "react-redux";

import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../../lib/endpoint-configs";
import { queryClient } from "../../../lib/endpoint-configs";
import { useFetchBanks } from "../../../hooks/useTanstackQueryFetch";
import RefetchIcon from "../../UI/Refetch/RefetchIcon";
import { motion } from "framer-motion";

import FormModal from "../../UI/Modal/FormModal";

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
      setValidation("Please select a Bank");
      return;
    }

    setValidation(null);

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
    <FormModal onBackdropClick={props.onCancel}>
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
          <div className={styles.refetch}>
            <select
              id="bank_name"
              value={selectedBankId}
              onChange={selectChangeHandler}
            >
              <option value={0}>---</option>
              {banks && banks.length > 0 && banks.map(mapBanks)}
            </select>
            <RefetchIcon
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              onClick={refetchBanks}
              sx={{
                fontWeight: "bold",
                color: "#405d27",
              }}
            />
          </div>
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
          <motion.button
            whileHover={{
              backgroundColor: "#ab003c",
              scale: 1.1,
              border: "1px solid #ab003c",
            }}
            transition={{ type: "spring", stiffness: 500 }}
            type="button"
            onClick={props.onCancel}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            transition={{ type: "spring", stiffness: 500 }}
            whileHover={{
              scale: 1.1,
            }}
          >
            {isPending ? "Creating..." : "Create Account"}
          </motion.button>
        </div>
        {validation && <p>{validation}</p>}
        {isError && <p>{error.status + ":" + error.message}</p>}
      </form>
    </FormModal>
  );
};

export default CreateAccountForm;

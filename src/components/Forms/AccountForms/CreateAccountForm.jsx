import React, { useState } from "react";
import styles from "./CreateAccountForm.module.css";

import { useSelector } from "react-redux";

import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../../lib/endpoint-configs";
import { queryClient } from "../../../lib/endpoint-configs";
import { useFetchBanks } from "../../../hooks/useTanstackQueryFetch";
import { AnimatePresence } from "framer-motion";

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
  const formModalStatus = useSelector((state) => state.formModal.showModal);
  const { data: banks } = useFetchBanks(authToken);

  const {
    mutate: createNewAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
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
    <AnimatePresence>
      {formModalStatus && (
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
                {isPending ? "Creating..." : "Create Account"}
              </button>
            </div>
            {validation && <p>{validation}</p>}
            {isError && <p>{error.status + ":" + error.message}</p>}
          </form>
        </FormModal>
      )}
    </AnimatePresence>
  );
};

export default CreateAccountForm;

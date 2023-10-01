import React, { useState } from "react";
import styles from "./UserAccountForm.module.css";
import FormModal from "../../UI/Modal/FormModal";
import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const apiURL = import.meta.env.VITE_API_URL;
import { Alert } from "@mui/material";

const UserAccountForm = ({ data, onCancel }) => {
  const [accountJoint, setAccountJoint] = useState(data.joint);
  const authToken = useSelector((state) => state.userAuth.authToken);
  const formModalStatus = useSelector((state) => state.formModal.showModal);
  const [validation, setValidation] = useState(null);
  const {
    mutate: editAccount,
    isPending,
    isError,
    error: errorEditAccount,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      onCancel();
    },
  });

  const jointChangeHandler = (event) => {
    setAccountJoint(event.target.checked);
  };

  const accountEditHandler = (event) => {
    event.preventDefault();

    if (accountJoint === data.joint) {
      setValidation("No Data Changed");
      return;
    }
    setValidation(null);
    const accountChangeConfig = {
      url: apiURL + "/accounts/" + data.id,
      method: "PUT",
      body: JSON.stringify({
        joint: accountJoint,
      }),
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    editAccount({ requestConfig: accountChangeConfig });
  };

  return (
    <>
      {formModalStatus && (
        <FormModal onBackdropClick={onCancel}>
          <form className={styles.form} onSubmit={accountEditHandler}>
            <div className={styles.inputs}>
              <div className={styles.readonly}>
                <label htmlFor="account_no">Account#</label>
                <input
                  id="account_no"
                  readOnly={true}
                  value={data.account_no}
                />
              </div>
              <div className={styles.readonly}>
                <label htmlFor="bank_name">Bank Name</label>
                <input id="bank_name" readOnly={true} value={data.bank_name} />
              </div>
            </div>
            <div className={styles.checkbox}>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={data.active}
                  disabled={true}
                ></input>
                <label>Active</label>
              </div>
              <div onClick={jointChangeHandler}>
                <input
                  type="checkbox"
                  checked={accountJoint}
                  onChange={jointChangeHandler}
                ></input>
                <label>Joint</label>
              </div>
            </div>
            <div className={styles.actions}>
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit">
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
            {isError && (
              <p>{errorEditAccount.status + ":" + errorEditAccount.message}</p>
            )}
            {validation && <Alert severity="warning">{validation}</Alert>}
          </form>
        </FormModal>
      )}
    </>
  );
};

export default UserAccountForm;

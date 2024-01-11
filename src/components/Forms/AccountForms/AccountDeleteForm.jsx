import React from "react";
import styles from "./AccountDeleteForm.module.css";
import FormModal from "../../UI/Modal/FormModal";
import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const apiURL = import.meta.env.VITE_API_URL;

const AccountDeleteForm = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: deleteAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[1] === authToken &&
          (query.queryKey[0] === "accounts" ||
            query.queryKey[0] === "inactive-accounts"),
      });
      props.onCancel();
    },
  });

  const deleteFormSubmitHandler = (event) => {
    event.preventDefault();
    const deleteAccountConfig = {
      url: apiURL + "/accounts/" + props.account.id,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    deleteAccount({ requestConfig: deleteAccountConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <form onSubmit={deleteFormSubmitHandler} className={styles.form}>
        <div>
          <p>Account# {props.account.account_no} will be deleted!</p>
          <p className={styles.message}> Do you want to proceed?</p>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles["imp-button"]}>
            {isPending ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
        {isError && <p>{error.status + ":" + errorEditAccount.message}</p>}
      </form>
    </FormModal>
  );
};

export default AccountDeleteForm;

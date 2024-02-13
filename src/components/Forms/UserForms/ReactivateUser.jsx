import React from "react";
import styles from "./UserDelete.module.css";
import FormModal from "../../UI/Modal/FormModal";
import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const apiURL = import.meta.env.VITE_API_URL;

const ReactivateUser = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: reactivateUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      props.onCancel();
    },
  });

  const reactivateUserHandler = (event) => {
    event.preventDefault();
    const reactivateUserConfig = {
      url: apiURL + "/admin/user/" + props.user.id,
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    reactivateUser({ requestConfig: reactivateUserConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <form onSubmit={reactivateUserHandler} className={styles.form}>
        <div>
          <p>
            You are <strong>reactivating</strong> User {props.user.userName}.
          </p>
          <p className={styles.message}> Do you want to proceed?</p>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles["imp-button"]}>
            {isPending ? "Re-Activate..." : "Confirm"}
          </button>
        </div>
        {isError && (
          <p className="error">{error.status + ":" + error.message}</p>
        )}
      </form>
    </FormModal>
  );
};

export default ReactivateUser;

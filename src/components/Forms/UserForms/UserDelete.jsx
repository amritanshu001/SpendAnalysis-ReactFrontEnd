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

const UserDelete = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: deleteUser,
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

  const deleteUserHandler = (event) => {
    event.preventDefault();
    const deleteUserConfig = {
      url: apiURL + "/admin/user/" + props.user.id,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    deleteUser({ requestConfig: deleteUserConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <form onSubmit={deleteUserHandler} className={styles.form}>
        <div>
          <p>
            User {props.user.userName} will be <strong>deleted forever</strong>.
            This action <strong>cannot be reverted!!!</strong>
          </p>
          <p className={styles.message}> Do you want to proceed?</p>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles["imp-button"]}>
            {isPending ? "Deleting..." : "Confirm"}
          </button>
        </div>
        {isError && (
          <p className="error">{error.status + ":" + error.message}</p>
        )}
      </form>
    </FormModal>
  );
};

export default UserDelete;

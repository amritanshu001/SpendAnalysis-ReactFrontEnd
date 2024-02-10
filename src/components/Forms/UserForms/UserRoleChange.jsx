import React from "react";
import styles from "./UserRoleChange.module.css";
import FormModal from "../../UI/Modal/FormModal";
import {
  sendMutationRequest,
  queryClient,
} from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const apiURL = import.meta.env.VITE_API_URL;

const UserRoleChange = (props) => {
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: changeUserRole,
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

  const changeUserRoleHandler = (event) => {
    event.preventDefault();
    const changeUserRoleConfig = {
      url: apiURL + "/admin/user/" + props.user.id,
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ admin: props.admin }),
    };
    changeUserRole({ requestConfig: changeUserRoleConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <form onSubmit={changeUserRoleHandler} className={styles.form}>
        <div>
          <p>
            User {props.user.userName} will be{" "}
            {props.admin ? "upgraded" : "donwgraded"} to{" "}
            {props.admin ? "Admin" : "User"}
            {props.admin ? " and will have advanced privilages!" : "."}
          </p>
          <p className={styles.message}> Do you want to proceed?</p>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles["imp-button"]}>
            {isPending ? "Changing Role..." : "Confirm"}
          </button>
        </div>
        {isError && (
          <p className="error">{error.status + ":" + error.message}</p>
        )}
      </form>
    </FormModal>
  );
};

export default UserRoleChange;

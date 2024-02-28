import React from "react";
import styles from "./UserDelete.module.css";
import FormModal from "../../UI/Modal/FormModal";
import { sendMutationRequest } from "../../../lib/endpoint-configs";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logUserOutActions } from "../../../store/auth-slice";
import { showAndHideMessages } from "../../../store/message-slice";

const apiURL = import.meta.env.VITE_API_URL;

const UnRegister = (props) => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const authToken = useSelector((state) => state.userAuth.authToken);
  const {
    mutate: unRegisterUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: () => {
      props.onCancel();
      dispatch(logUserOutActions());
      dispatch(
        showAndHideMessages({
          status: "success",
          messageText:
            "You have been successfully deregistered and logged out!",
        })
      );
      redirect("/login", { replace: true });
      console.log("Logged Out successfully");
    },
  });

  const deRegisterUserHandler = (event) => {
    event.preventDefault();
    const deRegisterUserConfig = {
      url: apiURL + "/de-register",
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    };
    unRegisterUser({ requestConfig: deRegisterUserConfig });
    // props.onDelete(props.account.id);
  };

  return (
    <FormModal onBackdropClick={props.onCancel}>
      <form onSubmit={deRegisterUserHandler} className={styles.form}>
        <div>
          <p>
            You are unregistering from our site!? We are sad to see you go!
            Please note that if you proceed, you will not be able to login to
            our systems without Admin intervention.
          </p>
          <p className={styles.message}> Do you want to proceed?</p>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles["imp-button"]}>
            {isPending ? "De-Register" : "Confirm"}
          </button>
        </div>
        {isError && (
          <p className="error">{error.status + ":" + error.message}</p>
        )}
      </form>
    </FormModal>
  );
};

export default UnRegister;

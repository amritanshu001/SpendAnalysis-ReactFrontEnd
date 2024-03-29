import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./RequestResetPassword.module.css";

import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import Container from "../UI/Container";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

import SpinnerCircular from "../UI/Feedback/SpinnerCircular";

import useInputValidator from "../../hooks/useInputValidator";
import { useMutation } from "@tanstack/react-query";
import { emailValidator } from "../../lib/validators";
import { sendMutationRequest } from "../../lib/endpoint-configs";

const apiURL = import.meta.env.VITE_API_URL;

const siteAddress = document.location.origin + document.location.pathname;
const sucessMessage = (
  <div className={styles["server-success"]}>
    <p>
      <strong>
        Password Reset link has been sent successfully to the email provided.
      </strong>
    </p>
    <p>
      If the email is registered in our systems, you will receive a password
      reset link on your mail. Please click on the link to reset your password.
    </p>
  </div>
);

const ResetPassword = () => {
  const location = useLocation();
  const {
    inputValue: enteredEmail,
    inputIsValid: emailIsValid,
    isError: emailIsError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    resetInput: resetEmail,
  } = useInputValidator(emailValidator);

  const {
    mutate: sendPasswordResetRequest,
    isPending: passwordResetLoading,
    isError: isPasswordResetError,
    error: passwordResetError,
    isSuccess: passwordResetReqSuccess,
  } = useMutation({ mutationFn: sendMutationRequest });

  let serverMessage = null;

  if (passwordResetLoading) {
    serverMessage = <SpinnerCircular color="success" />;
  }

  if (isPasswordResetError) {
    serverMessage = (
      <div className={styles["server-error"]}>
        {passwordResetError.status + ":" + passwordResetError.message}
      </div>
    );
  }

  if (passwordResetReqSuccess) {
    serverMessage = sucessMessage;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const requestConfig = {
      url: apiURL + "/pwd-reset-request",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_id: enteredEmail,
        site_url: siteAddress,
      }),
    };

    sendPasswordResetRequest({ requestConfig });
    resetEmail();
  };

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
      <Header>Reset Password Request</Header>
      <Container>
        <form onSubmit={onSubmitHandler} className={styles["reset-form"]}>
          <Input
            id="email"
            type="email"
            name="email"
            value={enteredEmail}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            disabled={passwordResetLoading}
            className={emailIsError ? styles.invalid : ""}
          >
            Email Id
          </Input>
          <div className={styles.actions}>
            <Button
              type="submit"
              disabled={!emailIsValid}
              whileHover={{ scale: emailIsValid ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              Send Reset Link
            </Button>
          </div>
        </form>
      </Container>
      {serverMessage}
    </React.Fragment>
  );
};

export default ResetPassword;

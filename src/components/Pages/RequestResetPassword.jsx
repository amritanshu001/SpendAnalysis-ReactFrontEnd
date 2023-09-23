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
import useHttp from "../../hooks/useHTTP";
import { emailValidator } from "../../lib/validators";

import apiURL from "../../endpoint";

const siteAddress = document.location.origin + document.location.pathname;
const sucessMessage = (
  <div className={styles["server-success"]}>
    Password Reset link has been sent successfully to the email provided. If the
    email is registered in our systems, you will receive a password reset link
    on your mail. Please click on the link to reset your password.
  </div>
);

const ResetPassword = () => {
  const location = useLocation();
  console.log(location.pathname);
  const [responseMessage, setResponseMessage] = useState(null);
  const {
    inputValue: enteredEmail,
    inputIsValid: emailIsValid,
    isError: emailIsError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    resetInput: resetEmail,
  } = useInputValidator(emailValidator);

  const processResetResponse = useCallback((rawdata) => {
    setResponseMessage(sucessMessage);
  }, []);

  const {
    isloading: passwordResetLoading,
    error: passwordResetError,
    sendRequest: sendPasswordResetRequest,
    resetError: resetPasswordError,
  } = useHttp(processResetResponse);

  let serverMessage = null;

  if (passwordResetLoading) {
    serverMessage = <SpinnerCircular color="success" />;
  }

  if (!passwordResetLoading && passwordResetError) {
    serverMessage = (
      <div className={styles["server-error"]}>{passwordResetError}</div>
    );
  }

  if (!passwordResetLoading && responseMessage) {
    serverMessage = responseMessage;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const requestConfig = {
      url: apiURL + "/pwd-reset-request",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email_id: enteredEmail,
        site_url: siteAddress,
      },
    };

    sendPasswordResetRequest(requestConfig);
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
            <Button type="submit" disabled={!emailIsValid}>
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

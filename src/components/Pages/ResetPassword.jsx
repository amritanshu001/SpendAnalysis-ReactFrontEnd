import React, { useCallback, useState, useEffect } from "react";
import styles from "./ResetPassword.module.css";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import Container from "../UI/Container";
import SpinnerCircular from "../UI/Feedback/SpinnerCircular";

import useInputValidator from "../../hooks/useInputValidator";
import useHttp from "../../hooks/useHTTP";
import { passwordValidator } from "../../lib/validators";

import apiURL from "../../endpoint";

const sucessMessage = (
  <div className={styles["server-success"]}>
    Password reset successuflly!, Redirecting to Login Page...
  </div>
);

const ResetPassword = () => {
  const { hash: userHash } = useParams();
  const history = useNavigate();
  const [responseMessage, setResponseMessage] = useState(null);
  const {
    inputValue: enteredPassword,
    inputIsValid: passwordIsValid,
    isError: passwordIsError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    resetInput: resetPassword,
  } = useInputValidator(passwordValidator);

  const {
    inputValue: enteredRePassword,
    inputIsValid: repasswordIsValid,
    isError: repasswordIsError,
    inputBlurHandler: repasswordBlurHandler,
    inputChangeHandler: repasswordChangeHandler,
    resetInput: resetRePassword,
  } = useInputValidator(passwordValidator);

  const processResetResponse = useCallback((rawdata) => {
    setResponseMessage(sucessMessage);
  }, []);

  const {
    isloading: passwordResetLoading,
    error: passwordResetError,
    sendRequest: sendPasswordReset,
    resetError: resetPasswordError,
  } = useHttp(processResetResponse);

  let serverMessage = null;
  let passwordMatch = enteredPassword === enteredRePassword;
  let formIsValid = passwordIsValid && repasswordIsValid && passwordMatch;

  if (passwordResetLoading) {
    serverMessage = <SpinnerCircular color="success" />;
  }

  if (!passwordResetLoading && passwordResetError) {
    serverMessage = (
      <div className={styles["server-error"]}>
        {passwordResetError + ".Redirecting to Login Page..."}
      </div>
    );
  }

  if (!passwordResetLoading && responseMessage) {
    serverMessage = responseMessage;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    resetPasswordError();
    setResponseMessage();

    const requestConfig = {
      url: apiURL + "/pwd-reset-request",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        userHash: userHash,
        newPassword: enteredPassword,
      },
    };

    sendPasswordReset(requestConfig);
    resetPassword();
    resetRePassword();
  };

  useEffect(() => {
    setTimeout(() => {
      if (!passwordResetLoading && (responseMessage || passwordResetError)) {
        history("/login", {replace:true});
      }
    }, 2000);
  }, [passwordResetLoading, responseMessage, passwordResetError]);

  return (
    <React.Fragment>
      <Header>Reset Password</Header>
      <Container>
        <form onSubmit={onSubmitHandler} className={styles["reset-form"]}>
          <Input
            id="newpassword"
            type="password"
            name="newpassword"
            value={enteredPassword}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            disabled={passwordResetLoading}
            className={passwordIsError ? styles.invalid : ""}
          >
            New Password
          </Input>
          <Input
            id="repeatnewpassword"
            type="password"
            name="repeatnewpassword"
            value={enteredRePassword}
            onBlur={repasswordBlurHandler}
            onChange={repasswordChangeHandler}
            disabled={passwordResetLoading}
            className={repasswordIsError ? styles.invalid : ""}
          >
            Repeat New Password
          </Input>
          {!passwordMatch ? (
            <p className={styles.error}>Passwords dont match</p>
          ) : null}
          <div className={styles.actions}>
            <Button type="submit" disabled={!formIsValid}>
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

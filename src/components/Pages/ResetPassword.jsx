import React, { useCallback, useState, useEffect } from "react";
import styles from "./ResetPassword.module.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import Container from "../UI/Container";
import SpinnerCircular from "../UI/Feedback/SpinnerCircular";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

import useInputValidator from "../../hooks/useInputValidator";
// import useHttp from "../../hooks/useHTTP";
import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../lib/endpoint-configs";
import { passwordValidator } from "../../lib/validators";

const apiURL = import.meta.env.VITE_API_URL;

const sucessMessage = (
  <div className={styles["server-success"]}>
    Password reset successuflly!, Redirecting to Login Page...
  </div>
);

const ResetPassword = () => {
  const { hash: userHash } = useParams();
  const location = useLocation();
  const currentPathArray = location.pathname.split("/");
  const history = useNavigate();
  // const [responseMessage, setResponseMessage] = useState(null);
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

  const {
    isPending: passwordResetLoading,
    isError: isPasswordResetError,
    error: passwordResetError,
    mutate: sendPasswordReset,
    isSuccess: isPassswordResetSuccess,
  } = useMutation({ mutationFn: sendMutationRequest });

  // const processResetResponse = useCallback((rawdata) => {
  //   setResponseMessage(sucessMessage);
  // }, []);

  // const {
  //   // isloading: passwordResetLoading,
  //   // error: passwordResetError,
  //   // sendRequest: sendPasswordReset,
  //   resetError: resetPasswordError,
  // } = useHttp(processResetResponse);

  let serverMessage = null;
  let passwordMatch = enteredPassword === enteredRePassword;
  let formIsValid = passwordIsValid && repasswordIsValid && passwordMatch;

  if (passwordResetLoading) {
    serverMessage = <SpinnerCircular color="success" />;
  }

  if (isPasswordResetError) {
    serverMessage = (
      <div className={styles["server-error"]}>
        {passwordResetError.status +
          ":" +
          passwordResetError.message +
          ".Redirecting to Login Page..."}
      </div>
    );
  }

  if (isPassswordResetSuccess) {
    serverMessage = sucessMessage;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // resetPasswordError();

    const requestConfig = {
      url: apiURL + "/pwd-reset-request",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userHash: userHash,
        newPassword: enteredPassword,
      }),
    };

    sendPasswordReset({ requestConfig });
    resetPassword();
    resetRePassword();
  };

  useEffect(() => {
    setTimeout(() => {
      if (isPasswordResetError || isPassswordResetSuccess) {
        history("/login", { replace: true });
      }
    }, 2000);
  }, [isPasswordResetError, isPassswordResetSuccess]);

  return (
    <React.Fragment>
      <HeadMetaData pathname={`/${currentPathArray[1]}/:hash`} />
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
              Reset Password
            </Button>
          </div>
        </form>
      </Container>
      {serverMessage}
    </React.Fragment>
  );
};

export default ResetPassword;

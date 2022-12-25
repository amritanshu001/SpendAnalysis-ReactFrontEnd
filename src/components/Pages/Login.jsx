import styles from "./Login.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import Container from "../UI/Container";

import { passwordValidator, emailValidator } from "../../lib/validators";
import { authActions } from "../../store/auth-slice";
import apiURL from "../../endpoint";

import useInputValidator from "../../hooks/useInputValidator";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import useHttp from "../../hooks/useHTTP";

const Login = (props) => {
  const dispatch = useDispatch();
  const redirect = useHistory();
  const [loginOption, setLoginOption] = useState(true);
  const [userData, setUserData] = useState(null);

  const getToken = useCallback((rawdata) => {
    setUserData(rawdata);
  }, []);

  const {
    isloading: loginLoading,
    error: loginError,
    sendRequest: sendLoginRequest,
  } = useHttp(getToken);

  const {
    inputValue: enteredUserName,
    inputIsValid: userNameValid,
    isError: userNameError,
    inputBlurHandler: userNameBlurHandler,
    inputChangeHandler: userNameChangeHandler,
    resetInput: resetUserName,
  } = useInputValidator(passwordValidator);

  const {
    inputValue: enteredEmail,
    inputIsValid: emailIsValid,
    isError: emailIsError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    resetInput: resetEmail,
  } = useInputValidator(emailValidator);

  const {
    inputValue: enteredPassword,
    inputIsValid: passwordIsValid,
    isError: passwordError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    resetInput: resetPassword,
  } = useInputValidator(passwordValidator);

  const {
    inputValue: enteredConfPassword,
    inputIsValid: confPasswordIsValid,
    isError: confPasswordError,
    inputBlurHandler: confPasswordBlurHandler,
    inputChangeHandler: confPasswordChangeHandler,
    resetInput: resetConfPassword,
  } = useInputValidator(passwordValidator);

  const optionToggleHandler = () => {
    setLoginOption((option) => !option);
  };

  useEffect(() => {
    if (loginOption) {
      resetConfPassword();
      resetUserName();
    }
  }, [loginOption]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (loginOption) {
      const loginConfig = {
        url: apiURL + "/userlogin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email_id: enteredEmail,
          password: enteredPassword,
        },
      };

      sendLoginRequest(loginConfig);

      resetPassword();
      resetEmail();
    } else {
      resetPassword();
      resetEmail();
      resetConfPassword();
    }
  };

  useEffect(() => {
    if (!loginLoading && !loginError && userData) {
      dispatch(
        authActions.logUserIn({
          authToken: userData.access_token,
          isAdmin: userData.admin,
        })
      );
      redirect.replace("/");
    }
  }, [userData, loginLoading, loginError]);

  let passwordMatch = enteredPassword === enteredConfPassword;

  let formIsValid =
    emailIsValid &&
    passwordIsValid &&
    confPasswordIsValid &&
    passwordMatch &&
    userNameValid;

  let confirmError = confPasswordError || !passwordMatch;

  if (loginOption) {
    formIsValid = emailIsValid && passwordIsValid;
  }

  let buttonName;
  if (loginOption) {
    if (loginLoading) {
      buttonName = "Logging In...";
    } else {
      buttonName = "Login";
    }
  } else {
    buttonName = "Register";
  }

  return (
    <React.Fragment>
      <Header>{loginOption ? "Login" : "Register"}</Header>
      <Container>
        <form onSubmit={onSubmitHandler} className={styles["login-form"]}>
          {!loginOption && (
            <Input
              id="username"
              type="text"
              name="username"
              value={enteredUserName}
              onBlur={userNameBlurHandler}
              onChange={userNameChangeHandler}
              disabled={loginLoading}
              className={userNameError ? styles.invalid : ""}
            >
              User Name
            </Input>
          )}
          <Input
            id="email"
            type="email"
            name="email"
            value={enteredEmail}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            disabled={loginLoading}
            className={emailIsError ? styles.invalid : ""}
          >
            Email Id
          </Input>
          <Input
            id="password"
            type="password"
            name="password"
            value={enteredPassword}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            disabled={loginLoading}
            className={passwordError ? styles.invalid : ""}
          >
            Password
          </Input>
          {!loginOption && (
            <React.Fragment>
              <Input
                id="confpassword"
                type="password"
                name="confpassword"
                value={enteredConfPassword}
                onBlur={confPasswordBlurHandler}
                onChange={confPasswordChangeHandler}
                disabled={loginLoading}
                className={confPasswordError ? styles.invalid : ""}
              >
                Confirm Password
              </Input>
              {confirmError && (
                <p className={styles.error}>Passwords Dont Match</p>
              )}
            </React.Fragment>
          )}
          <div className={styles.actions}>
            <Button type="submit" disabled={!formIsValid}>
              {buttonName}
            </Button>
            <Button
              type="button"
              onClick={optionToggleHandler}
              className={styles.toggler}
            >
              {loginOption ? "New User?" : "Existing User Login"}
            </Button>
          </div>
          {loginError && <p className={styles.error}>{loginError}</p>}
        </form>
      </Container>
    </React.Fragment>
  );
};

export default Login;

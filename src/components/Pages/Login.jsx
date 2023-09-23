import styles from "./Login.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import Container from "../UI/Container";

import { Link, useLocation } from "react-router-dom";

import { passwordValidator, emailValidator } from "../../lib/validators";
import { authActions } from "../../store/auth-slice";
import { logUserInActions } from "../../store/auth-slice";
import { showAndHideMessages } from "../../store/message-slice";
import apiURL from "../../endpoint";

import useInputValidator from "../../hooks/useInputValidator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import useHttp from "../../hooks/useHTTP";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

const Login = (props) => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const location = useLocation();

  const [loginOption, setLoginOption] = useState(true);

  //Setting up Login Hook
  const getToken = useCallback((rawdata) => {
    dispatch(
      authActions.logUserIn({
        authToken: rawdata.access_token,
        isAdmin: rawdata.admin,
        expiresIn: rawdata.expires_in,
      })
    );
    dispatch(logUserInActions(rawdata.access_token));
    dispatch(
      showAndHideMessages({
        status: "success",
        messageText: "Login Successful. Welcome " + rawdata.email_id,
      })
    );
    redirect.replace("/");
  }, []);

  const {
    isloading: loginLoading,
    error: loginError,
    sendRequest: sendLoginRequest,
    resetError: loginErrorReset,
  } = useHttp(getToken);

  //Setting up registration hook
  const processRegisteredUser = useCallback((rawdata) => {
    dispatch(
      showAndHideMessages({
        status: "success",
        messageText:
          "Registration successful! Your User Id is " + rawdata.user_id,
      })
    );
    setLoginOption(true);
  }, []);

  const {
    isloading: registerLoading,
    error: registerError,
    sendRequest: sendRegisterRequest,
    resetError: registerErrorReset,
  } = useHttp(processRegisteredUser);

  //Setting input Validation hooks
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

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (loginOption) {
      loginErrorReset();
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
      registerErrorReset();
      const registerConfig = {
        url: apiURL + "/registration",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          user_name: enteredUserName,
          email_id: enteredEmail,
          password: enteredPassword,
        },
      };
      setServerResponse(false);
      sendRegisterRequest(registerConfig);
      resetPassword();
      resetUserName();
      resetEmail();
      resetConfPassword();
    }
  };

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

  if (registerError) {
    dispatch(
      showAndHideMessages({
        status: "error",
        messageText: registerError,
      })
    );
  }

  //After Effects

  useEffect(() => {
    if (loginOption) {
      resetConfPassword();
      resetUserName();
    }
  }, [loginOption]);

  return (
    <React.Fragment>
      <HeadMetaData pathname={location.pathname} />
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
            <button
              type="button"
              onClick={optionToggleHandler}
              className={styles.toggler}
            >
              {loginOption ? "New User?" : "Existing User Login"}
            </button>
            <Link to="/request-resetpassword">Reset Password</Link>
          </div>
          {loginError && <p className={styles.error}>{loginError}</p>}
        </form>
      </Container>
      {registerLoading && (
        <div className={styles["server-loading"]}>
          Setting up your account...
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;

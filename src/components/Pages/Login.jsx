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

const apiURL = import.meta.env.VITE_API_URL;

import useInputValidator from "../../hooks/useInputValidator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { sendMutationRequest } from "../../lib/endpoint-configs";
import React, { useState, useEffect } from "react";
// import useHttp from "../../hooks/useHTTP";
import HeadMetaData from "../UI/HeadMetadata/HeadMetaData";

const Login = (props) => {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const location = useLocation();

  const { isPending: isLoginPending, mutate: sendLoginRequest } = useMutation({
    mutationFn: sendMutationRequest,
    onSuccess: (data) => {
      dispatch(
        authActions.logUserIn({
          authToken: data.access_token,
          isAdmin: data.admin,
          expiresIn: data.expires_in,
        })
      );
      dispatch(logUserInActions(data.access_token));
      dispatch(
        showAndHideMessages({
          status: "success",
          messageText: "Login Successful. Welcome " + data.email_id,
        })
      );
      redirect("/", { replace: true });
    },
    onError: (err) => {
      dispatch(
        showAndHideMessages({
          status: "error",
          messageText: err.status + ":" + err.message,
        })
      );
    },
  });

  const [loginOption, setLoginOption] = useState(true);

  const { mutate: sendUserRegistration, isPending: registrationPending } =
    useMutation({
      mutationFn: sendMutationRequest,
      onSuccess: (data) => {
        dispatch(
          showAndHideMessages({
            status: "success",
            messageText:
              "Registration successful! Your User Id is " + data.user_id,
          })
        );
        setLoginOption(true);
      },
      onError: (err) => {
        dispatch(
          showAndHideMessages({
            status: "error",
            messageText: err.status + ":" + err.message,
          })
        );
      },
    });

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
      // loginErrorReset();
      const loginConfig = {
        url: apiURL + "/userlogin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_id: enteredEmail,
          password: enteredPassword,
        }),
      };

      sendLoginRequest({ requestConfig: loginConfig });

      resetPassword();
      resetEmail();
    } else {
      const registerConfig = {
        url: apiURL + "/registration",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: enteredUserName,
          email_id: enteredEmail,
          password: enteredPassword,
        }),
      };
      sendUserRegistration({ requestConfig: registerConfig });

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
    if (isLoginPending) {
      buttonName = "Logging In...";
    } else {
      buttonName = "Login";
    }
  } else {
    buttonName = "Register";
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
              disabled={isLoginPending}
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
            disabled={isLoginPending}
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
            disabled={isLoginPending}
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
                disabled={isLoginPending}
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
              {loginOption ? "New User?" : "Login"}
            </button>
            <Link to="/request-resetpassword">Reset Password</Link>
          </div>
        </form>
      </Container>
      {registrationPending && (
        <div className={styles["server-loading"]}>
          Setting up your account...
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;

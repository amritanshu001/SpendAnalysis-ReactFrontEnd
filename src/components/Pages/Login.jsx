import styles from "./Login.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import Container from "../UI/Container";

import { passwordValidator, emailValidator } from "../../lib/validators";
import { authActions } from "../../store/auth-slice";

import useInputValidator from "../../hooks/useInputValidator";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

const Login = (props) => {
  const dispatch = useDispatch();
  const redirect = useHistory();
  const [loginOption, setLoginOption] = useState(true);

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

  const onLoginHandler = (event) => {
    event.preventDefault();

    // send API Request Here

    dispatch(
      authActions.logUserIn({ authToken: Math.random(), isAdmin: false })
    );

    resetPassword();
    resetEmail();
    // redirect.replace("/");
  };

  let formIsValid =
    emailIsValid &&
    passwordIsValid &&
    confPasswordIsValid &&
    enteredPassword === enteredConfPassword;

  if (loginOption) {
    formIsValid = emailIsValid && passwordIsValid;
  }

  return (
    <React.Fragment>
      <Header>{loginOption ? "Login" : "Register"}</Header>
      <Container>
        <form onSubmit={onLoginHandler} className={styles["login-form"]}>
          <Input
            id="email"
            type="email"
            name="email"
            value={enteredEmail}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
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
            className={passwordError ? styles.invalid : ""}
          >
            Password
          </Input>
          {!loginOption && (
            <Input
              id="password"
              type="password"
              name="password"
              value={enteredConfPassword}
              onBlur={confPasswordBlurHandler}
              onChange={confPasswordChangeHandler}
              className={confPasswordError ? styles.invalid : ""}
            >
              Confirm Password
            </Input>
          )}
          <div className={styles.actions}>
            <Button type="submit" disabled={!formIsValid}>
              {loginOption ? "Login" : "Register"}
            </Button>
            <Button
              type="button"
              onClick={optionToggleHandler}
              className={styles.toggler}
            >
              {loginOption
                ? "Register New User"
                : "Login with existing Account"}
            </Button>
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default Login;

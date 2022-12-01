import styles from "./Login.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import Container from "../UI/Container";

import { passwordValidator, emailValidator } from "../../lib/validators";
import { authActions } from "../../store/auth-slice";

import useInputValidator from "../../hooks/useInputValidator";
import { useDispatch } from "react-redux";

const Login = (props) => {
  const dispatch = useDispatch();

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

  const onLoginHandler = (event) => {
    event.preventDefault();

    // send API Request Here

    dispatch(
      authActions.logUserIn({ authToken: Math.random(), isAdmin: false })
    );

    resetPassword();
    resetEmail();
  };

  let formIsValid = emailIsValid && passwordIsValid;

  return (
    <React.Fragment>
      <Header>{props.title}</Header>
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
          <Button type="submit" disabled={!formIsValid}>
            Login
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default Login;

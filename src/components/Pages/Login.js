import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import Container from "../UI/Container";
import NavContext from "../contexts/nav-context";

const Login = (props) => {
  const ctx = useContext(NavContext);

  const [validEmail, validateEmail] = useState(false);
  const [validPassword, validatePassword] = useState(false);
  // const [validLoginForm, setValidityLogin] = useState(false);
  const [errormsg, setErromsg] = useState("");

  const onLoginHandler = (event) => {
    event.preventDefault();
    // let admin = true;
    ctx.loginHandler();
    ctx.adminHandler(false);
  };

  const emailValidator = (email) => {
    if (
      String(email)
        .toLowerCase()
        .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      validateEmail(true);
    } else {
      validateEmail(false);
    }
  };

  const passwordValidator = (password) => {
    if (String(password).toLowerCase().length >= 8) {
      validatePassword(true);
    } else {
      validatePassword(false);
    }
  };

  const validClass = !(validEmail && validPassword) ? styles.disabled : "";

  return (
    <React.Fragment>
      <Header>Login</Header>
      <Container>
        <form onSubmit={onLoginHandler} className={styles["login-form"]}>
          <Input
            id="email"
            type="email"
            name="email"
            onBlur={emailValidator}
            className={!validEmail ? styles.invalid : ""}
          >
            Email Id
          </Input>
          <Input
            id="password"
            type="password"
            name="password"
            onBlur={passwordValidator}
            className={!validPassword ? styles.invalid : ""}
          >
            Password
          </Input>
          <Button
            type="submit"
            className={validClass}
            disabled={!(validEmail && validPassword)}
          >
            Login
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default Login;

import React, { useRef, useState } from "react";
import styles from "./Register.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import Container from "../UI/Container";

const Login = (props) => {
  const [validEmail, validateEmail] = useState(false);
  const [validPassword, validatePassword] = useState(false);
  const [validRePassword, validateRePassword] = useState(false);
  const [errormsg, setErromsg] = useState("");

  const onRegisterHandler = (event) => {
    event.preventDefault();
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

  const rePasswordBlurHandler = (event) => {
    if (passwordRef.current.value === repasswordRef.current.value) {
      validateRePassword(true);
    } else {
      validateRePassword(false);
    }
  };

  const validClass = !(validEmail && validPassword && validRePassword)
    ? styles.disabled
    : "";

  const passwordRef = useRef();
  const repasswordRef = useRef();

  return (
    <React.Fragment>
      <Header>{props.title}</Header>
      <Container>
        <form onSubmit={onRegisterHandler} className={styles["register-form"]}>
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
            ref={passwordRef}
            onBlur={passwordValidator}
            className={!validPassword ? styles.invalid : ""}
          >
            Password
          </Input>
          <Input
            id="re-password"
            type="password"
            name="re-password"
            ref={repasswordRef}
            onBlur={rePasswordBlurHandler}
            className={!validRePassword ? styles.invalid : ""}
          >
            Re-Enter Password
          </Input>
          <Button type="submit" className={validClass}>
            Register
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default Login;

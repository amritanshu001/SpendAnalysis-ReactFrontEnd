import React from "react";
import styles from "./Register.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";

const Login = (props) => {
  const onRegisterHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={onRegisterHandler}>
      <Input id="email" type="email" name="email">
        Email Id
      </Input>
      <Input id="password" type="password" name="password">
        Password
      </Input>
      <Input id="re-password" type="password" name="re-password">
        Re-Enter Password
      </Input>
      <Button type="submit">Register</Button>
    </form>
  );
};

export default Login;

import React, { useContext } from "react";
import styles from "./Login.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import NavContext from "../contexts/nav-context";

const Login = (props) => {
  const ctx = useContext(NavContext);

  const onLoginHandler = (event) => {
    event.preventDefault();
    // let admin = true;
    ctx.loginHandler();
    ctx.adminHandler(false);
  };
  return (
    <React.Fragment>
      <Header>Login</Header>
      <form onSubmit={onLoginHandler}>
        <Input id="email" type="email" name="email">
          Email Id
        </Input>
        <Input id="password" type="password" name="password">
          Password
        </Input>
        <Button type="submit">Login</Button>
      </form>
    </React.Fragment>
  );
};

export default Login;

import React, { useContext } from "react";
import styles from "./App.module.css";
import Navbar from "./components/UI/Navbar";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import { Switch, Route } from "react-router-dom";
import pagesList from "./lib/pagelist";
// import navbar_data from "./data/data";

const App = (props) => {
  return (
    <React.Fragment>
      <Navbar nav={pagesList}></Navbar>
      <main className={styles["main-area"]}>
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/register">
            <Register title="Register" />
          </Route>
          <Route path="/login">
            <Login title="Login" />
          </Route>
          <Route path="/spendanalysis"></Route>
          <Route path="/manageaccount"></Route>
          <Route path="/uploadstatement"></Route>
          <Route path="/addbank"></Route>
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;

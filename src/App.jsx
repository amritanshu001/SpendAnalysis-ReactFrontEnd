import styles from "./App.module.css";
import Navbar from "./components/UI/Navbar";
import Login from "./components/Pages/Login";
import Home from "./components/Pages/Home";
import AddBank from "./components/Pages/AddBank";
import ManageAccounts from "./components/Pages/ManageAccounts";
import SpendAnalysis from "./components/Pages/SpendAnalysis";

import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";

// import navbar_data from "./data/data";

const App = (props) => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <main className={styles["main-area"]}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/spendanalysis">
            <SpendAnalysis />
          </Route>
          <Route path="/manageaccount">
            <ManageAccounts />
          </Route>
          <Route path="/uploadstatement"></Route>
          <Route path="/addbank">
            <AddBank />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;

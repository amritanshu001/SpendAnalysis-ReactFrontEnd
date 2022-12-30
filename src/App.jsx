import styles from "./App.module.css";
import Navbar from "./components/UI/Navbar";
import Login from "./components/Pages/Login";
import Home from "./components/Pages/Home";
import AddBank from "./components/Pages/AddBank";
import ManageAccounts from "./components/Pages/ManageAccounts";
import SpendAnalysis from "./components/Pages/SpendAnalysis";

import { useSelector } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import UploadStatement from "./components/Pages/UploadStatement";

// import navbar_data from "./data/data";

const App = (props) => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);
  const userAccounts = useSelector((state) => state.userAccounts.userAccounts);
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <main className={styles["main-area"]}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          {!isUserLoggedIn && (
            <Route path="/login">
              <Login />
            </Route>
          )}
          <Route path="/spendanalysis">
            {isUserLoggedIn ? (
              <SpendAnalysis accounts={userAccounts} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/manageaccount">
            {isUserLoggedIn ? (
              <ManageAccounts accounts={userAccounts} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/uploadstatement">
            {isUserLoggedIn && <UploadStatement />}
          </Route>

          <Route path="/addbank">
            {isUserLoggedIn && isUserAdmin ? <AddBank /> : <Redirect to="/" />}
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

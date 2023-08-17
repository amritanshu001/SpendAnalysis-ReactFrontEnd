import styles from "./App.module.css";

import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./MUIThemeEngine/theme";
import Paper from "@mui/material/Paper";

const Navbar = React.lazy(() => import("./components/UI/Navbar"));
const Login = React.lazy(() => import("./components/Pages/Login"));
const Home = React.lazy(() => import("./components/Pages/Home"));
const AddBank = React.lazy(() => import("./components/Pages/AddBank"));
const ManageAccounts = React.lazy(() =>
  import("./components/Pages/ManageAccounts")
);
const SpendAnalysis = React.lazy(() =>
  import("./components/Pages/SpendAnalysis")
);
const ResetPassword = React.lazy(() =>
  import("./components/Pages/RequestResetPassword")
);

import { useSelector } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";

import UploadStatement from "./components/Pages/UploadStatement";

const App = (props) => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);
  const userAccounts = useSelector((state) => state.userAccounts.userAccounts);
  return (
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
      {/* <main className={styles["main-area"]}> */}
      <Paper elevation={0} sx={{ marginTop: 5 }}>
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
          <Route path="/request-resetpassword">
            <ResetPassword />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Paper>
      {/* </main> */}
    </ThemeProvider>
  );
};

export default App;

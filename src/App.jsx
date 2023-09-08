import styles from "./App.module.css";

import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./MUIThemeEngine/theme";
import Paper from "@mui/material/Paper";

import { showAndHideMessages } from "./store/message-slice";

const Navbar = React.lazy(() => import("./components/UI/Navbar"));
const Login = React.lazy(() => import("./components/Pages/Login"));
const Home = React.lazy(() => import("./components/Pages/Home"));
const AddBank = React.lazy(() => import("./components/Pages/AddBank"));
const Footer = React.lazy(() => import("./components/UI/Footer"));
const ManageAccounts = React.lazy(() =>
  import("./components/Pages/ManageAccounts")
);
const SpendAnalysis = React.lazy(() =>
  import("./components/Pages/SpendAnalysis")
);
const RequestResetPassword = React.lazy(() =>
  import("./components/Pages/RequestResetPassword")
);

const ResetPassword = React.lazy(() =>
  import("./components/Pages/ResetPassword")
);
import AppLogout from "./components/Functional/AppLogout";

import { useSelector, useDispatch } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";

import UploadStatement from "./components/Pages/UploadStatement";

const messageRenderer = (condition, dispatch, message) => {
  if (!condition) {
    dispatch(
      showAndHideMessages({
        status: "error",
        messageText: message,
      })
    );
  }
  return;
};

const App = (props) => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);
  const userAccounts = useSelector((state) => state.userAccounts.userAccounts);
  const globalMessage = useSelector((state) => state.globalMessages.messages);
  const showMessage = useSelector((state) => state.globalMessages.showMessage);
  const dispatch = useDispatch();
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
          <Route
            path="/spendanalysis"
            render={() => {
              messageRenderer(
                isUserLoggedIn,
                dispatch,
                "Please login to access this page"
              );
              return isUserLoggedIn ? (
                <AppLogout>
                  <SpendAnalysis accounts={userAccounts} />
                </AppLogout>
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            path="/manageaccount"
            render={() => {
              messageRenderer(
                isUserLoggedIn,
                dispatch,
                "Please login to access this page"
              );
              return isUserLoggedIn ? (
                <AppLogout>
                  <ManageAccounts accounts={userAccounts} />
                </AppLogout>
              ) : (
                <Redirect to="/login" />
              );
            }}
          />

          <Route
            path="/uploadstatement"
            render={() => {
              messageRenderer(
                isUserLoggedIn,
                dispatch,
                "Please login to access this page"
              );
              return isUserLoggedIn ? (
                <AppLogout>
                  <UploadStatement />
                </AppLogout>
              ) : (
                <Redirect to="/login" />
              );
            }}
          />

          <Route
            path="/addbank"
            render={() => {
              messageRenderer(
                isUserLoggedIn && isUserAdmin,
                dispatch,
                "Need to have admin access to view this page"
              );
              return isUserLoggedIn && isUserAdmin ? (
                <AppLogout>
                  <AddBank />
                </AppLogout>
              ) : (
                <Redirect to="/" />
              );
            }}
          />
          <Route path="/request-resetpassword/:hash">
            <ResetPassword />
          </Route>
          <Route path="/request-resetpassword">
            <RequestResetPassword />
          </Route>

          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Paper>
      {showMessage && <Footer message={globalMessage} />}
    </ThemeProvider>
  );
};

export default App;

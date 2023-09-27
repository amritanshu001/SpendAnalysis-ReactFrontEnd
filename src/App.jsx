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

import { QueryClientProvider } from "@tanstack/react-query";

import { Route, Routes, Navigate } from "react-router-dom";

import UploadStatement from "./components/Pages/UploadStatement";

import { queryClient } from "../src/lib/endpoint-configs";

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Navbar></Navbar>
        <Paper elevation={0} sx={{ marginTop: 5 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {!isUserLoggedIn && <Route path="/login" element={<Login />} />}
            <Route
              path="/spendanalysis"
              element={
                isUserLoggedIn ? (
                  <AppLogout>
                    <SpendAnalysis accounts={userAccounts} />
                  </AppLogout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/manageaccount"
              element={
                isUserLoggedIn ? (
                  <AppLogout>
                    <ManageAccounts accounts={userAccounts} />
                  </AppLogout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/uploadstatement"
              element={
                isUserLoggedIn ? (
                  <AppLogout>
                    <UploadStatement />
                  </AppLogout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/addbank"
              element={
                isUserLoggedIn && isUserAdmin ? (
                  <AppLogout>
                    <AddBank />
                  </AppLogout>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/request-resetpassword/:hash"
              element={<ResetPassword />}
            />

            <Route
              path="/request-resetpassword"
              element={<RequestResetPassword />}
            />
            <Route path="index.html" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Paper>
        {showMessage && <Footer message={globalMessage} />}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

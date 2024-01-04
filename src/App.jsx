import styles from "./App.module.css";

import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./MUIThemeEngine/theme";
import Paper from "@mui/material/Paper";
import { AnimatePresence } from "framer-motion";

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

import AdminAccounts from "./components/Pages/Admin/AdminAccounts";

import AdminProtect from "./components/Functional/AdminProtect";
import LoginProtect from "./components/Functional/LoginProtect";
import AppLogout from "./components/Functional/AppLogout";
import LoginRouteProtect from "./components/Functional/LoginRouteProtect";

import { useSelector } from "react-redux";

import { QueryClientProvider } from "@tanstack/react-query";

import { Route, Routes, Navigate } from "react-router-dom";

import UploadStatement from "./components/Pages/UploadStatement";

import { queryClient } from "../src/lib/endpoint-configs";

const App = (props) => {
  const globalMessage = useSelector((state) => state.globalMessages.messages);
  const showMessage = useSelector((state) => state.globalMessages.showMessage);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Navbar></Navbar>
        <Paper elevation={0} sx={{ marginTop: 5 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<LoginRouteProtect />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<LoginProtect />}>
              <Route
                path="/spendanalysis"
                element={
                  <AppLogout>
                    <SpendAnalysis />
                  </AppLogout>
                }
              />
              <Route
                path="/manageaccount"
                element={
                  <AppLogout>
                    <ManageAccounts />
                  </AppLogout>
                }
              />
              <Route
                path="/uploadstatement"
                element={
                  <AppLogout>
                    <UploadStatement />
                  </AppLogout>
                }
              />
            </Route>
            <Route element={<AdminProtect />}>
              <Route
                path="/admin/addbank"
                element={
                  <AppLogout>
                    <AddBank />
                  </AppLogout>
                }
              />
              <Route
                path="/admin/accounts"
                element={
                  <AppLogout>
                    <AdminAccounts />
                  </AppLogout>
                }
              />
            </Route>
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
        <AnimatePresence>
          {showMessage && <Footer message={globalMessage} />}
        </AnimatePresence>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

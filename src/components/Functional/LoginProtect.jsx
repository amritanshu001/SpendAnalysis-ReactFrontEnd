import React from "react";
import AppLogout from "./AppLogout";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginProtect = () => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  return isUserLoggedIn ? (
    <AppLogout>
      <Outlet />
    </AppLogout>
  ) : (
    <Navigate to="/login" />
  );
};

export default LoginProtect;

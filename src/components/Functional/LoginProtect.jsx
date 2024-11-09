import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginProtect = () => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const location = useLocation();
  return isUserLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ fromLocation: location.pathname, authorized: false }}
    />
  );
};

export default LoginProtect;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginRouteProtect = () => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  return !isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default LoginRouteProtect;

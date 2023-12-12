import React from "react";
import AppLogout from "./AppLogout";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtect = () => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);
  return isUserLoggedIn && isUserAdmin ? (
    <AppLogout>
      <Outlet />
    </AppLogout>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminProtect;

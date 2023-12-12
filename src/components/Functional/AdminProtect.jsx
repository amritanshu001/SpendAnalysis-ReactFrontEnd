import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtect = () => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);
  let returnObject;
  if (!isUserLoggedIn) {
    returnObject = <Navigate to="/login" />;
  }
  if (isUserLoggedIn && !isUserAdmin) {
    returnObject = <Navigate to="/" />;
  }
  if (isUserLoggedIn && isUserAdmin) {
    returnObject = <Outlet />;
  }
  return returnObject;
};

export default AdminProtect;

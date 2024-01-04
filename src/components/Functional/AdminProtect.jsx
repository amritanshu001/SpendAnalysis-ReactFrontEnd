import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminPage from "../Pages/AdminPage";

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
    returnObject = <AdminPage />;
  }
  return returnObject;
};

export default AdminProtect;

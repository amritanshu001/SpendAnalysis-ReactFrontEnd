import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminPage from "../Pages/AdminPage";

const AdminProtect = () => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);
  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (isUserLoggedIn && !isUserAdmin) {
    return <Navigate to="/" />;
  }
  if (isUserLoggedIn && isUserAdmin) {
    return <AdminPage />;
  }
};

export default AdminProtect;

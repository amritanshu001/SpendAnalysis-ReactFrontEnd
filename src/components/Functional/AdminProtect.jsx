import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminPage from "../Pages/AdminPage";

const AdminProtect = () => {
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);
  const location = useLocation();
  if (!isUserLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ fromLocation: location.pathname, authorized: false }}
      />
    );
  }
  if (isUserLoggedIn && !isUserAdmin) {
    return (
      <Navigate
        to="/"
        state={{ fromLocation: location.pathname, authorized: false }}
      />
    );
  }
  if (isUserLoggedIn && isUserAdmin) {
    return <AdminPage />;
  }
};

export default AdminProtect;

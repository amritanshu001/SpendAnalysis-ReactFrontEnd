import React from "react";
import { Outlet } from "react-router-dom";
import NavTabs from "../UI/MUITabs/NavTabs";

const AdminPage = () => {
  return (
    <>
      <NavTabs />
      <Outlet />
    </>
  );
};

export default AdminPage;

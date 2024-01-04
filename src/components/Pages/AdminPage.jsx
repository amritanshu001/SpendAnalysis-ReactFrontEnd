import React from "react";
import { Outlet } from "react-router-dom";
import Drawer from "../UI/MUIDrawer/Drawer";

const AdminPage = () => {
  return (
    <>
      <Drawer />
      <Outlet />
    </>
  );
};

export default AdminPage;

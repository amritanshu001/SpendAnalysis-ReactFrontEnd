import React, { useContext } from "react";
import styles from "./App.module.css";
import Navbar from "./components/UI/Navbar";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import NavContext from "./components/contexts/nav-context";
// import navbar_data from "./data/data";

const App = (props) => {
  const ctx = useContext(NavContext);
  const navbar_data = [
    { title: "Home", href: "/", id: "01", visible: true },
    { title: "Login", href: "/login", id: "02", visible: !ctx.isLoggedIn },
    {
      title: "Register",
      href: "/register",
      id: "03",
      visible: !ctx.isLoggedIn,
    },
    {
      title: "Spend Analysis",
      href: "/spendanalysis",
      id: "04",
      visible: ctx.isLoggedIn,
    },
    {
      title: "Manage Accounts",
      href: "/manageaccount",
      id: "05",
      visible: ctx.isLoggedIn,
    },
    {
      title: "Upload Statement",
      href: "/uploadstatement",
      id: "06",
      visible: ctx.isLoggedIn,
    },
    {
      title: "Bank Details",
      href: "/addbank",
      id: "07",
      visible: ctx.isLoggedIn && ctx.isAdmin,
    },
  ];

  return (
    <React.Fragment>
      <Navbar nav={navbar_data}></Navbar>
      <main className={styles["main-area"]}>
        <Login title="Login"></Login>
        {/* <Register title="Register"></Register> */}
      </main>
    </React.Fragment>
  );
};

export default App;

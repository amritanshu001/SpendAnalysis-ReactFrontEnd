import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import NavContext from "../contexts/nav-context";

const Navbar = (props) => {
  const ctx = useContext(NavContext);
  const mapLink = (navdata) => {
    const hyper = navdata.visible && (
      <li key={navdata.id}>
        <NavLink to={navdata.href}>{navdata.title}</NavLink>
      </li>
    );
    return hyper;
  };
  // console.log(props.nav);
  return (
    <header className={styles.header}>
      <div>Spend Analysis</div>
      <nav className={styles.navbar}>
        <ul>{props.nav.map(mapLink)}</ul>
        {ctx.isLoggedIn && (
          <Button className={styles.logout} onClick={ctx.logoutHandler}>
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

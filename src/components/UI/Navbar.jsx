import React, { useContext } from "react";
import Hyperlink from "./Hyperlink";
import styles from "./Navbar.module.css";
import Button from "./Button";
import NavContext from "../contexts/nav-context";

const Navbar = (props) => {
  const ctx = useContext(NavContext);
  const mapLink = (navdata) => {
    const hyper = navdata.visible && (
      <Hyperlink key={navdata.id} href={navdata.href} id={navdata.id}>
        {navdata.title}
      </Hyperlink>
    );
    return hyper;
  };
  // console.log(props.nav);
  return (
    <header className={styles.header}>
      <ul className={styles.navbar}>{props.nav.map(mapLink)}</ul>
      {ctx.isLoggedIn && (
        <Button className={styles.logout} onClick={ctx.logoutHandler}>
          Logout
        </Button>
      )}
    </header>
  );
};

export default Navbar;

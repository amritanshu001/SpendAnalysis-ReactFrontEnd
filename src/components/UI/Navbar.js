import React, { useContext } from "react";
import Hyperlink from "./Hyperlink";
import styles from "./Navbar.module.css";
import Button from "./Button";
import NavContext from "../contexts/nav-context";

const Navbar = (props) => {
  const ctx = useContext(NavContext);
  const mapLink = (navdata) => {
    const hyper = navdata.visible && (
      <Hyperlink href={navdata.href} id={navdata.id}>
        {navdata.title}
      </Hyperlink>
    );
    return hyper;
  };
  console.log(props.nav);
  return (
    <div className={styles.navbar}>
      <ul>{props.nav.map(mapLink)}</ul>
      {ctx.isLoggedIn && (
        <Button className={styles.logout} onClick={ctx.logoutHandler}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Navbar;

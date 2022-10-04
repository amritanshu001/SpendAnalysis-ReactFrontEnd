import React from "react";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={`${styles["form-header"]} ${props.className}`}>
      <h2>{props.children}</h2>
    </div>
  );
};

export default Header;

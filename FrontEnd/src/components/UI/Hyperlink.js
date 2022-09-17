import React, { useState } from "react";
import styles from "./Hyperlink.module.css";

const Hyperlink = (props) => {
  const [classes, updateClasses] = useState("");

  const onLinkClickHandler = (event) => {
    event.preventDefault();
    console.log(styles.active);
    updateClasses(styles.active);
  };

  const onBlurHandler = (event) => {
    console.log(styles.active);
    updateClasses("");
  };

  console.log(classes);

  return (
    <li key={props.id} onClick={onLinkClickHandler} onBlur={onBlurHandler}>
      <a className={classes} href={props.href}>
        {props.children}
      </a>
    </li>
  );
};

export default Hyperlink;

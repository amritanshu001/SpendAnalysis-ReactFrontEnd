import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  console.log("Button Disabled", props.disabled);
  return (
    <button
      className={`${styles.button} ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={`${styles["button-div"]}`}>
      <button
        className={`${styles.button} ${props.className}`}
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;

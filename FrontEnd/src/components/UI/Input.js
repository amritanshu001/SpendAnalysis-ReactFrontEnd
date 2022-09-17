import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles.form}>
      <label for={props.id}>{props.children}</label>
      <input id={props.id} type={props.type} name={props.name}></input>
    </div>
  );
};

export default Input;

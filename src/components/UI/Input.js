import React, { useState } from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const [input, setInput] = useState();

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{props.children}</label>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        value={input}
        onChange={inputChangeHandler}
        onBlur={props.onBlur}
      ></input>
    </div>
  );
};

export default Input;

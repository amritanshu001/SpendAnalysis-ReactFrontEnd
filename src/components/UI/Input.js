import React, { useState } from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const [userInput, setInput] = useState("");

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const inputBlurHandler = () => {
    if (props.onBlur) {
      props.onBlur(userInput);
    }
  };

  return (
    <div className={`${styles.input}`}>
      <label htmlFor={props.id}>{props.children}</label>
      <input
        ref={ref}
        id={props.id}
        type={props.type}
        name={props.name}
        value={userInput}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        className={props.className}
      ></input>
    </div>
  );
});

export default Input;

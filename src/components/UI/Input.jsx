import styles from "./Input.module.css";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={`${styles.input}`}>
      <label htmlFor={props.id}>{props.children}</label>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className={props.className}
        disabled={props.disabled}
      ></input>
    </div>
  );
});

export default motion(Input);

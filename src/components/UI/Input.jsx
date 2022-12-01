import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={`${styles.input}`}>
      <label htmlFor={props.id}>{props.children}</label>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className={props.className}
      ></input>
    </div>
  );
};

export default Input;

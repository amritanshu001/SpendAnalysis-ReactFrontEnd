import styles from "./Input.module.css";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { TextField, useTheme } from "@mui/material";

const Input = forwardRef((props, ref) => {
  const theme = useTheme();
  return (
    <div ref={ref} className={`${styles.input}`}>
      <label
        htmlFor={props.id}
        style={{
          color:
            theme.palette.mode === "light"
              ? theme.palette.secondary.dark
              : theme.palette.secondary.light,
        }}
      >
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className={props.className}
        disabled={props.disabled}
      />
    </div>
  );
});

export const NewInput = (props) => {
  return (
    <TextField
      id={props.id}
      label={props.label}
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      error={props.error}
      helperText={props.errorText}
      variant="outlined"
      inputRef={props.inputRef}
      required={"required" in props ? !!props.required : false}
      disabled={"disabled" in props ? !!props.disabled : false}
      multiline={"multiline" in props ? !!props.multiline : false}
      maxRows={4}
      defaultValue={props.defaultValue}
      sx={{ ...props.sx }}
    />
  );
};

export default motion(Input);

import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const MUISelect = (props) => {
  return (
    <FormControl error={props.error} size="small" sx={{ minWidth: "250px" }}>
      <InputLabel id={props.id} color="secondary">
        {props.label}
      </InputLabel>
      <Select
        label={props.label}
        labelId={props.id}
        displayEmpty
        value={props.value}
        onChange={props.onChange}
        sx={{ boxShadow: 1 }}
      >
        {props.list.map((listItem) => (
          <MenuItem key={listItem.id} value={listItem.id}>
            {listItem.displayName}
          </MenuItem>
        ))}
      </Select>
      {props.error && <FormHelperText>{props.errorText}</FormHelperText>}
    </FormControl>
  );
};

export default MUISelect;

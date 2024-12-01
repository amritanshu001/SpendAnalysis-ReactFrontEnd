import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClearIcon from "@mui/icons-material/Clear";

const SelectClearIcon = (props) => {
  return (
    <IconButton onClick={props.onClick} size="small">
      <ClearIcon color="error" />
    </IconButton>
  );
};

const MUISelect = (props) => {
  let show = false;
  if ("clearValue" in props) {
    show = true;
  }
  return (
    <FormControl
      error={props.error}
      size="small"
      sx={{ minWidth: "250px", ...props.sx }}
    >
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
        // endAdornment={props.value === "" ? null : <SelectClearIcon />}
        IconComponent={() => {
          // props.value?
          return <ArrowDropDownIcon />;
        }}
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

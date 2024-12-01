import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const MUIAutocomplete = (props) => {
  let options = [];
  if ("groupBy" in props) {
    if (!("sorter" in props)) {
      throw Error("sorter function prop required with groupby prop");
    } else {
      options = props.options.sort(sorter);
    }
  } else {
    options = props.options;
  }
  return (
    <Autocomplete
      id={props.id}
      options={options}
      renderOption={props.renderOption}
      groupBy={props.groupBy}
      getOptionLabel={props.getOptionLabel}
      isOptionEqualToValue={props.isOptionEqualToValue}
      value={props.value}
      onChange={props.onChange}
      onClose={props.onClose}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      sx={{
        ...props.sx,
      }}
    />
  );
};

export default MUIAutocomplete;

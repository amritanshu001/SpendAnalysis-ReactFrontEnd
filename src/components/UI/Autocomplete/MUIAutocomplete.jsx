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
      options={options}
      renderOption={props.renderOption}
      groupBy={props.groupBy}
      getOptionLabel={props.getOptionLabel}
      isOptionEqualToValue={props.isOptionEqualToValue}
      value={props.value}
      onChange={props.onChange}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
};

export default MUIAutocomplete;

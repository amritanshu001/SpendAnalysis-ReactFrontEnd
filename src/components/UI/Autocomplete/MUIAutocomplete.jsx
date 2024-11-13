import React from "react";
import { Autocomplete, TextField, Stack } from "@mui/material";
import RefetchIcon from "../Refetch/RefetchIcon";

const MUIAutocomplete = (props) => {
  return (
    <Stack direction="row" gap={2}>
      <Autocomplete></Autocomplete>
      <RefetchIcon />
    </Stack>
  );
};

export default MUIAutocomplete;

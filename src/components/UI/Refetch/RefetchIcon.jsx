import React, { forwardRef } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";

const RefetchIcon = forwardRef((props, ref) => {
  return (
    <Tooltip title="Refetch" placement="bottom-start" arrow>
      <IconButton ref={ref} onClick={props.onClick}>
        <RefreshIcon sx={props.sx} />
      </IconButton>
    </Tooltip>
  );
});

export default motion(RefetchIcon);

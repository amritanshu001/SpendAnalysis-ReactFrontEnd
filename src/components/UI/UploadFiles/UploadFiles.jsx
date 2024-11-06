import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { forwardRef } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default forwardRef((props, ref) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      color="secondary"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      {props.buttonName}
      <VisuallyHiddenInput type="file" ref={ref} multiple={props.multiple} />
    </Button>
  );
});

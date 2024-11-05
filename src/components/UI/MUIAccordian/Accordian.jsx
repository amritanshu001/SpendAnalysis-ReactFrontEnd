import React from "react";
import { motion } from "framer-motion";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const AnimatedAccordinan = motion(Accordion);

const MUIAccordion = (props) => {
  return (
    <AnimatedAccordinan
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      expanded={props.expanded}
      disableGutters={true}
      defaultExpanded={props.defaultExpanded}
      onChange={props.onChange}
      disabled={props.disabled}
      sx={{
        width: "90%",
        margin: "auto",
        marginTop: "0.5rem",
        fontWeight: "bold",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.secHeader.main
            : theme.palette.secHeader.dark,
        color: "white",
        ...props.sx,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography fontWeight="bold" fontSize={20} fontFamily="inherit">
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </AnimatedAccordinan>
  );
};

export default MUIAccordion;

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
      sx={props.sx}
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

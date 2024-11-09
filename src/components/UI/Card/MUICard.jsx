import { Card, CardActions, CardContent } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

const AnimatedCard = motion(Card);

const MUICard = (props) => {
  return (
    <AnimatedCard
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <CardContent>{props.children}</CardContent>
      <CardActions>{props.actions}</CardActions>
    </AnimatedCard>
  );
};

export default MUICard;

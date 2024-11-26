import React from "react";
import styles from "./BalanceGrid.module.css";

const BalanceGrid = (props) => {
  return (
    <div className={styles.balance}>
      <div className={styles["content-box"]}>
        <p className={styles.label}>Opening Balance</p>
        <p className={styles.content}>
          <span className={styles.rupee}>&#8377;</span>
          {props.openingBal}
        </p>
      </div>
      <div className={styles["content-box"]}>
        <p className={styles.label}>Closing Balance</p>
        <p className={styles.content}>
          <span className={styles.rupee}>&#8377;</span>
          {props.closingBal}
        </p>
      </div>
      <div className={styles["content-box"]}>
        <p className={styles.label}>Deficit/Surplus</p>
        <p
          className={`${styles.content} ${
            props.openingBal > props.closingBal
              ? styles.negative
              : styles.positive
          }`}
        >
          <span className={styles.rupee}>&#8377;</span>
          {props.openingBal > props.closingBal
            ? (props.openingBal - props.closingBal).toFixed(2)
            : (props.closingBal - props.openingBal).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

// import Grid from "@mui/material/Grid2";
import { Typography, Grid } from "@mui/material";

const NewBalanceGrid = (props) => {
  const positive = props.openingBal > props.closingBal ? false : true;
  return (
    <Grid
      container
      item
      // gap={2}
      // sm={6}
      xs={4}
      direction={"column"}
      sx={{
        border: (theme) => `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 1,
        p: 1,
        m: 1,
        textAlign: "center",
      }}
    >
      <Grid item container sm={4} xs={12}>
        <Grid item xs={6} sm={6}>
          <Typography>Opening Balance</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography>&#8377; {props.openingBal}</Typography>
        </Grid>
      </Grid>
      <Grid item container sm={4} xs={12}>
        <Grid item xs={6} sm={6}>
          <Typography>Closing Balance</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography>&#8377; {props.closingBal}</Typography>
        </Grid>
      </Grid>
      <Grid item container sm={4} xs={12}>
        <Grid item xs={6} sm={6}>
          <Typography>Deficit/Surplus</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography
            sx={{
              "&.MuiTypography-root": {
                color: positive ? "success.main" : "error.main",
              },
              fontWeight: "bold",
            }}
          >
            &#8377;{" "}
            {positive
              ? (props.openingBal - props.closingBal).toFixed(2)
              : (props.closingBal - props.openingBal).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewBalanceGrid;

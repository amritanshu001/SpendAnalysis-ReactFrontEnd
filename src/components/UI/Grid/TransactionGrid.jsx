import React from "react";
import styles from "./TransactionGrid.module.css";
import { Grid, Typography } from "@mui/material";

const TransactionGrid = (props) => {
  return (
    <div className={styles.average}>
      <div className={styles.labels}>
        <p className={styles.blank}></p>
        <p>Incoming</p>
        <p>Outgoing</p>
      </div>
      <div className={styles.labels}>
        <p>Amount</p>
        <p>
          <span className={styles.rupee}>&#8377;</span>{" "}
          {props.summary.incomingSum.toFixed(2)}
        </p>
        <p>
          <span className={styles.rupee}>&#8377;</span>{" "}
          {props.summary.outgoingSum.toFixed(2)}
        </p>
      </div>
      <div className={styles.labels}>
        <p>Txn #</p>
        <p>{props.summary.incomingTxnCount}</p>
        <p>{props.summary.outgoingTxnCount}</p>
      </div>
      <div className={styles.labels}>
        <p>Avg</p>
        <p>
          <span className={styles.rupee}>&#8377;</span>
          {(props.summary.incomingSum / props.summary.incomingTxnCount).toFixed(
            2
          )}
        </p>
        <p>
          <span className={styles.rupee}>&#8377;</span>
          {(props.summary.outgoingSum / props.summary.outgoingTxnCount).toFixed(
            2
          )}
        </p>
      </div>
    </div>
  );
};

const NewTransactionGrid = (props) => {
  return (
    <Grid container item xs={4} textAlign={"center"}>
      <Grid container item>
        <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <Typography>Incoming</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Outgoing</Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={4}>
          <Typography>Amount</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            &#8377; {props.summary.incomingSum.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            &#8377; {props.summary.outgoingSum.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={4}>
          <Typography> Txn #</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>{props.summary.incomingTxnCount}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>{props.summary.outgoingTxnCount}</Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={4}>
          <Typography>Avg</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            &#8377;{" "}
            {(
              props.summary.incomingSum / props.summary.incomingTxnCount
            ).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            &#8377;{" "}
            {(
              props.summary.outgoingSum / props.summary.outgoingTxnCount
            ).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTransactionGrid;

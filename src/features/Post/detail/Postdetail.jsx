import React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../../app/components/layouts/Loading";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));
const Postdetail = () => {
  const classes = useStyles();

  const { loading } = useSelector((state) => state.comment);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <Typography variant="h4">{localStorage.getItem("title")}</Typography>
      <Typography variant="h5">{localStorage.getItem("body")}</Typography>
      <Typography variant="h6" color="error" >Comments</Typography>

      {JSON.parse(localStorage.getItem("postDetails")).map((item) => {
        return (
          <Paper className={classes.paper} key={Math.random()} key={item.id} >
            <Grid xl={3}>
              <Typography variant="body2">{item.email}</Typography>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body1">{item.body}</Typography>
            </Grid>
          </Paper>
        );
      })}
    </div>
  );
};
export default Postdetail;

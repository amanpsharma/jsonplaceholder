import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./postSlice";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../../app/components/layouts/Loading";
import { useHistory } from "react-router-dom";
import { getComment, getTitle } from "../detail/detailSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    // maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));
const Post = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { postList, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const postDetail = (id, title, body) => {
    dispatch(getComment(id));
    const comment = {title, body}
    dispatch(getTitle(comment));
    history.push(`/postdetails/${id}`);
  };
  return loading ? (
    <Loader />
  ) : (
    <div>
      <Typography variant="h5">POST </Typography><hr/>
      {postList.length > 0 &&
        postList.map((item) => {
          return (
            <Paper
              className={classes.paper}
              key={Math.random()}
              onClick={() => {
                postDetail(item.id, item.title, item.body);
              }}
              style={{ cursor: "pointer" }}
            >
              <Grid xl={3}>
                <Typography variant="h5" color="secondary">
                  {item.title}
                </Typography>
                <Typography variant="body1" color="primary">
                  {item.body}
                </Typography>
              </Grid>
            </Paper>
          );
        })}
    </div>
  );
};
export default Post;

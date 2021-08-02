import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import Loader from "../../../app/components/layouts/Loading";
const Photos = () => {
  const { loading } = useSelector((state) => state.photo);

  const data = JSON.parse(localStorage.getItem("photoDetails"));
  return loading ? (
    <Loader />
  ) : (
    <div>
      <Typography variant="h4">Photo Details</Typography>
      <hr />
      <Typography variant="h4">{localStorage.getItem("photoTitle")}</Typography>
      <hr />
      <Typography variant="h4">{localStorage.getItem("user")}</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexFlow: "wrap",
          justifyContent: "space-between",
        }}
      >
        {data.length > 0 &&
          data.map((item) => {
            return (
              <div style={{ margin: 5 }} key={Math.random()}>
                <Card style={{ width: 200, height: 320 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={item.title}
                      height="140"
                      image={item.thumbnailUrl}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h5">
                        {item.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Photos;

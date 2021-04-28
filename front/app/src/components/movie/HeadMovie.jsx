import React from "react";
import { Chip, makeStyles } from "@material-ui/core";
import Time from "@material-ui/icons/AccessTime";
import Downoald from "@material-ui/icons/SystemUpdateAlt";
import Rating from "@material-ui/icons/Stars";
import Like from "@material-ui/icons/ThumbUpAltOutlined";

export default function HeadMovie({ movie }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.head}>
        <div className={classes.coverFilm}>
          <img
            className={classes.cover}
            src={movie?.medium_cover_image}
            alt={movie?.title}
          />
        </div>
        <div className={classes.infos}>
          <h1>{movie?.title}</h1>
          <h2>{movie?.year}</h2>
          <h3>
            {movie?.genres?.map((el, i) => (
              <Chip
                key={i}
                label={el}
                style={{ margin: "2px" }}
                color="secondary"
                variant="outlined"
              />
            ))}
          </h3>
          <div className={classes.title}>
            <i className={classes.icon}>
              <Rating />
            </i>
            <h5>{movie?.rating}/10</h5>
          </div>
          <div className={classes.title}>
            <i className={classes.icon}>
              <Time />
            </i>
            <h5> {movie?.runtime} minutes</h5>
          </div>
          <div className={classes.title}>
            <i className={classes.icon}>
              <Like />
            </i>
            <h5>{movie?.like_count}</h5>
          </div>
          <div className={classes.title}>
            <i className={classes.icon}>
              <Downoald />
            </i>
            <h5>{movie?.download_count}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  head: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down(768)]: {
      flexDirection: "column",
      "& $coverFilm": {
        display: "flex",
        justifyContent: "center",
      },
    },
  },
  cover: {
    width: "290px",
    border: "3px solid #E4E6EB",
    borderRadius: "5px",
    "&:hover": {
      border: "3px solid #f50057",
    },
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  coverFilm: {
    flexBasis: "10%",
  },
  infos: { justifyContent: "center", marginLeft: "3%", flexBasis: "90%" },

  icon: {
    marginRight: "10px",
  },
}));

import React from "react";
import { makeStyles } from "@material-ui/core";

export default function Synopsys({ movie }) {
  const classes = useStyles();
  return (
    <>
      <div>
        <h2>Synopsy:</h2>
        <p className={classes.text}>{movie?.description_full}</p>
      </div>
      <div>
        <h2>Capture</h2>
        <div className={classes.capture}>
          <img
            className={classes.image}
            src={movie?.medium_screenshot_image1}
            alt={movie?.title}
          />
          <img
            className={classes.image}
            src={movie?.medium_screenshot_image2}
            alt={movie?.title}
          />
          <img
            className={classes.image}
            src={movie?.medium_screenshot_image3}
            alt={movie?.title}
          />
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  capture: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  image: {
    margin: "10px",
  },
  text: {
    paddingLeft: "60px",
    paddingRight: "60px",
    textAlign: "justify",
    textAlignLast: "center",
    [theme.breakpoints.down(768)]: {
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    [theme.breakpoints.down(425)]: {
      paddingLeft: "5px",
      paddingRight: "5px",
    },
  },
}));

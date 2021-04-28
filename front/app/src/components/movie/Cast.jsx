import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Cast({ sug, movie }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <h2>Cast :</h2>
      <div
        style={{
          display: "flex",
          flexFlow: "wrap row",
          justifyContent: "center",
        }}
      >
        {movie?.cast?.map((cast, i) => (
          <div className={classes.cast} key={i}>
            <Avatar
              onClick={() =>
                window.open(`https://www.imdb.com/name/nm${cast.imdb_code}`)
              }
              className={classes.avatar}
              src={cast.url_small_image}
              alt={cast.name}
            />
            <h6 style={{ marginLeft: "16px" }}>
              {cast.name} as {cast.character_name}
            </h6>
          </div>
        ))}
      </div>
      <div>
        <h2>Smilair</h2>
        <div className={classes.suggest}>
          {sug?.map((sug, i) => {
            return (
              <div
                onClick={() => {
                  return history.push(`/movie/${sug.id}`);
                }}
                key={i}
                className={classes.suggestImage}
              >
                <img src={sug.medium_cover_image} alt={sug.title} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  cast: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "10px",
  },
  suggest: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  suggestCard: {
    width: "210px",
    borderRadius: "5px",
  },
  suggestImage: {
    cursor: "pointer",
    margin: "10px",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "0.7s",
    },
  },
  avatar: {
    cursor: "pointer",
    "&:hover": {
      transition: "1s",
      transform: "scale(1.3)",
    },
  },
}));

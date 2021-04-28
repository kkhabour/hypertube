import { makeStyles } from "@material-ui/core";
import Star from "@material-ui/icons/StarOutlined";
import Play from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import Vue from "@material-ui/icons/RemoveRedEye";
import ActiveWatch from "@material-ui/icons/Bookmark";
import InactiveWatch from "@material-ui/icons/BookmarkBorder";
import { useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { getInstance } from "../../helpers/instance";
import { AuthContext } from "../../context/context";

const Thumbnails = ({ e, watched, view }) => {
  const history = useHistory();
  const classes = useStyles();
  const [watch, setWatch] = useState(false);
  const [seen, setSeen] = useState(false);
  const {
    auth: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (watched) {
      let filtred = watched.filter((el) => {
        return el.movie_id === e.id;
      });
      if (filtred.length) setWatch(true);
    }
    if (view) {
      let filtred = view.filter((el) => {
        return el.movie_id === e.id;
      });
      if (filtred.length) setSeen(true);
      else setSeen(false);
    }
    return () => {
      setSeen(false);
      setWatch(false);
    };
  }, [watched, view, seen, e]);
  const addWatch = () => {
    getInstance(token)
      .post("/movie/watchlist", { id: e.id })
      .then((res) => {})
      .catch((e) => {
        return;
      });
  };
  return (
    <div className={classes.thumb}>
      <div className={classes.head}>
        <div className={classes.rating}>
          <i>
            <Star fontSize="small" style={{ color: "#F3951F" }} />
          </i>
          <span>{e.rating}</span>
        </div>
      </div>
      <div className={classes.gradien}></div>

      {seen ? (
        <div className={classes.vue}>
          <i>
            <Vue />
          </i>
        </div>
      ) : (
        ""
      )}

      <div
        onClick={() => {
          return history.push(`/movie/${e.id}`);
        }}
        className={classes.play}
      >
        <i>
          <Play className={classes.iconPlay} />
        </i>
      </div>
      <div
        onClick={() => {
          addWatch();
          setWatch(!watch);
        }}
        className={classes.addtowatch}
      >
        <i>{watch ? <ActiveWatch /> : <InactiveWatch />}</i>
      </div>
      <div className={classes.title}>
        <span>{e.title_long}</span>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {e.genres?.map((el, i) => (
            <div key={i} className={classes.tag}>
              {el}
            </div>
          ))}
        </div>
      </div>

      <img className={classes.img} src={e.medium_cover_image} alt={e.title} />
    </div>
  );
};

export default Thumbnails;
const useStyles = makeStyles((theme) => ({
  thumb: {
    width: "290px",
    height: "auto",
    // border: "1px solid black",
    marginRight: "10px",
    marginBottom: "15px",
    overflow: "hidden",
    borderRadius: "9px",
    position: "relative",
    "&:hover": {
      "& $img": {
        transform: "scale(1.1)",
        transition: "0.7s",
        // opacity: "0.5",
        backgroundColor: "red",
      },
      "& $title": {
        // transform: "scale(1.1)",
        transition: "0.7s",
        display: "block",
      },
      "& $play": {
        display: "block",
      },
      "& $gradien": {
        display: "block",
      },
    },
  },
  addtowatch: {
    left: "10px",
    top: "10px",
    zIndex: "3",
    color: "#F3951F",
    position: "absolute",
    backgroundColor: "#3A3B3C",
    padding: "6px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  title: {
    width: "90%",
    zIndex: "3",
    position: "absolute",
    color: "white",
    transform: "translate(-50%, 0)",
    bottom: "15px",
    left: "49%",
    display: "none",
    transition: "0.7s",
  },
  img: {
    width: "100%",
  },
  tag: {
    backgroundColor: "#3A3B3C",
    borderRadius: "5px",
    padding: "3px",
    margin: "2px",
  },
  head: {
    right: "10px",
    top: "10px",
    zIndex: "3",
    color: "white",
    position: "absolute",
    backgroundColor: "#3A3B3C",
    padding: "6px",
    // margin: "8px",
    borderRadius: "5px",
  },
  rating: {
    display: "flex",
    alignContent: "space-around",
  },
  play: {
    position: "absolute",
    transform: "translate(-50%, 0)",
    left: "50%",
    top: "30%",
    color: "#E4E6EB",
    zIndex: "3",
    display: "none",
    "&:hover": {
      color: "#F3951F",
      cursor: "pointer",
    },
  },
  iconPlay: {
    fontSize: "100px",
  },
  gradien: {
    width: "100%",
    height: "100%",
    zIndex: "2",
    background: "linear-gradient(to bottom ,rgba(255, 0, 0, 0), #000000  )",
    opacity: "0.6",
    position: "absolute",
    display: "none",
  },
  vue: {
    left: "180px",
    top: "8px",
    zIndex: "3",
    color: "#F3951F",
    position: "absolute",
    backgroundColor: "#3A3B3C",
    padding: "4px",
    // cursor: "pointer",
    borderRadius: "5px",
  },
}));

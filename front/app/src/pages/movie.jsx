import { Container, makeStyles, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import { Comments, Cast, Synopsys, HeadMovie } from "../components/index";
import { host } from "../constants/config";
import { AuthContext } from "../context/context";
import { hostUrl, Backup, api } from "../helpers/instance";

const Movie = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [quality, setQuality] = useState([]);
  const [sug, setSug] = useState();
  const history = useHistory();
  const [url, setUrl] = useState("");
  const [unmount, setUnmount] = useState(false);
  const {
    auth: { token, language },
  } = useContext(AuthContext);
  const creatUrl = (el) => {
    const { id, imdb_code } = movie;
    let url = `${host}/stream/${token}/${id}/${imdb_code}/${el.hash}`;
    setUrl(url);
  };

  const handleQuality = async (torrents) => {
    const HD = await torrents.find((el) => {
      return el.quality === "720p";
    });
    const QHD = await torrents.find((el) => {
      return el.quality === "1080p";
    });
    const D = await torrents.find((el) => {
      return el.quality === "3D";
    });
    const HDR = await torrents.find((el) => {
      return el.quality === "2160p";
    });

    await setQuality([HD, QHD, D, HDR]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isNaN(id)) {
      /*
       * redirect to Library
       */

      history.replace("/");
    } else {
      /*
       * Get Data
       */
      try {
        api
          .get(
            `/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`
          )
          .then(async (res) => {
            const { data } = res;

            if (data && data.data.movie.imdb_code !== "tt") {
              const { movie } = data.data;
              await setMovie(movie);
              api.get(`/movie_suggestions.json?movie_id=${id}`).then((res) => {
                const { movies } = res.data.data;
                setSug(movies);
              });
              await handleQuality(movie.torrents);
            } else {
              history.replace("/");
            }
          });
      } catch (e) {
        Backup.get(
          `/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`
        ).then(async (res) => {
          const { data } = res;

          if (data && data.data.movie.imdb_code !== "tt") {
            const { movie } = data.data;
            await setMovie(movie);
            Backup.get(`/movie_suggestions.json?movie_id=${id}`).then((res) => {
              const { movies } = res.data.data;
              setSug(movies);
            });
            await handleQuality(movie.torrents);
          } else {
            history.replace("/");
          }
        });
      }
    }
    setUnmount(true);
    return () => {
      setUrl("");
      setUnmount(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const filterd = quality.filter((el) => el);

  useEffect(() => {
    if (movie) {
      document.title = `${movie?.title_long}`;
    }
  }, [movie]);
  if (!unmount) return null;
  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.paper}>
          <HeadMovie movie={movie} />
          <Synopsys movie={movie} />
          <div style={{ marginTop: "64px", marginBottom: "64px" }}>
            <ReactPlayer
              id="videostream"
              controls
              width="100%"
              height="auto"
              url={url}
              config={{
                file: {
                  attributes: { crossOrigin: "true" },

                  tracks: [
                    {
                      kind: "captions",
                      src: `${hostUrl}/subtitle/${movie?.imdb_code}/fr`,
                      srcLang: "fr",
                      default: language === "FR",
                    },
                    {
                      kind: "captions",
                      src: `${hostUrl}/subtitle/${movie?.imdb_code}/en`,
                      srcLang: "en",
                      default: language === "EN",
                    },
                    {
                      kind: "captions",
                      src: `${hostUrl}/subtitle/${movie?.imdb_code}/ar`,
                      srcLang: "ar",
                    },
                  ],
                },
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {filterd.map((el, i) => (
              <Button
                onClick={() => creatUrl(el)}
                style={{ margin: "5px" }}
                key={i}
                color="secondary"
                variant="outlined"
              >
                {el.quality === "2160p" ? "4K" : el.quality}
              </Button>
            ))}
          </div>
          <Cast movie={movie} sug={sug} />
          <Comments id={id} />
        </div>
      </Container>
    </>
  );
};

export default Movie;

const useStyles = makeStyles((theme) => ({
  paper: {
    color: "#E4E6EB",
    marginTop: "5%",
  },
}));

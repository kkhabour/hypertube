import { Container } from "@material-ui/core";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/context";
import { getInstance } from "../helpers/instance";
import axios from "axios";
import WatchMovie from "../components/watchlist/WatchMovie";

export default function Watchlist() {
  const [view, setView] = useState([]);
  const {
    auth: { token },
  } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  const remove = (id) => {
    const filtred = movies.filter((el) => el.id !== id);
    setMovies(filtred);
  };
  const getmovie = (id) => {
    axios
      .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then((res) => {
        const { movie } = res.data.data;
        setMovies((old) => [...old, movie]);
      });
  };
  useEffect(() => {
    if (token) {
      getInstance(token)
        .get("/movie/watches")
        .then((res) => {
          const { watches } = res.data;
          setView(watches);
        });
      getInstance(token)
        .get(`/movie/watchlist`)
        .then((res) => {
          const { watchlist } = res.data;

          watchlist?.map((el) => {
            return getmovie(el.movie_id);
          });
        });
    }
  }, [token]);

  return (
    <Container maxWidth="lg">
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          background: "#3A3B3C",
          borderRadius: "10px",
          padding: "10px",
          color: "#E7E9ED",
        }}
      >
        Watchlist
      </h1>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          margin: "10px ",
          justifyContent: "center",
        }}
      >
        {movies?.map((e, i) => {
          return <WatchMovie key={i} e={e} remove={remove} view={view} />;
        })}
      </div>
    </Container>
  );
}

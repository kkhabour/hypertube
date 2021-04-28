import { Container } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { Search, Thumbnails } from "../components/index";
import { AuthContext } from "../context/context";
import { getInstance, ApiAllMovie, BackupAllMovie } from "../helpers/instance";

const Library = () => {
  const [num, setNum] = useState({
    rating: 0,
    sorted: "download_count",
    genre: "",
    order: "desc",
    search: "",
  });
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(2);
  const [movieCount, setMovieCount] = useState(0);
  const [load, setload] = useState(false);
  const [watched, setWatched] = useState([]);
  const [view, setView] = useState([]);
  // const history = useHistory();
  const {
    auth: { token },
  } = useContext(AuthContext);

  window.onscroll = function () {
    let totalPageHeight = document.body.scrollHeight;
    let scrollPoint = window.scrollY + window.innerHeight;
    if (scrollPoint >= totalPageHeight) {
      if (!load) {
        getData();
      }
    }
  };

  const getData = () => {
    setload(true);
    if (movieCount > movies.length) {
      ApiAllMovie.get(
        `?minimum_rating=${num.rating}&sort_by=${num.sorted}&genre=${num.genre}&page=${page}&order_by=${num.order}`
      )
        .then((res) => {
          setMovies((old) => [...old, ...res.data.data.movies]);
          setPage(page + 1);
          setload(false);
        })
        .catch((er) => {
          if (er) {
            BackupAllMovie.get(
              `?minimum_rating=${num.rating}&sort_by=${num.sorted}&genre=${num.genre}&page=${page}&order_by=${num.order}`
            ).then((res) => {
              setMovies((old) => [...old, ...res.data.data.movies]);
              setPage(page + 1);
              setload(false);
            });
          }
        });
    }
  };

  useEffect(() => {
    if (token) {
      getInstance(token)
        .get("/movie/watches")
        .then((res) => {
          const { watches } = res.data;
          setView(watches);
        })
        .catch((e) => {});
      getInstance(token)
        .get(`/movie/watchlist`)
        .then((res) => {
          const { watchlist } = res.data;
          setWatched(watchlist);
        })
        .catch((e) => {});
      ApiAllMovie.get(`?sort_by=${num.sorted}&order_by=${num.order}`)
        .then((res) => {
          setMovieCount(res.data.data.movie_count);
          setMovies(res.data.data.movies);
          setload(false);
        })
        .catch((error) => {
          BackupAllMovie.get(`?sort_by=${num.sorted}`).then((res) => {
            setMovieCount(res.data.data.movie_count);
            setMovies(res.data.data.movies);
            setload(false);
          });
        });

      return () => {
        window.onscroll = null;
      };
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    document.title = "HyperTube | Watch Your favorite Movie ";
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNum({ ...num, [name]: value });
  };

  return (
    <>
      <Container maxWidth="lg">
        <Search
          num={num}
          handleChange={handleChange}
          setMovies={setMovies}
          setMovieCount={setMovieCount}
        />
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            margin: "10px ",
            justifyContent: "center",
          }}
        >
          {movies?.map((e, i) => {
            return <Thumbnails key={i} e={e} watched={watched} view={view} />;
          })}
        </div>
      </Container>
    </>
  );
};

export default Library;

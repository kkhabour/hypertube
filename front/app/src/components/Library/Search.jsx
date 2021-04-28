import {
  Select,
  FormControl,
  MenuItem,
  makeStyles,
  InputLabel,
  Button,
  TextField,
} from "@material-ui/core";

import { ApiAllMovie } from "../../helpers/instance";

const searchFunction = (
  order,
  rating,
  sorted,
  genre,
  setvalue,
  setAllMovies,
  string
) => {
  string = !/^([a-zA-Z0-9_-\s]){1,50}$/.test(string) ? (string = "") : string;

  ApiAllMovie.get(
    `?minimum_rating=${rating}&sort_by=${sorted}&genre=${genre}&query_term=${string}&order_by=${order}`
  )
    .then((res) => {
      setAllMovies(res.data.data.movie_count);
      setvalue(res.data.data.movies);
    })
    .catch((er) => {
      if (er) {
        ApiAllMovie.get(
          `?minimum_rating=${rating}&sort_by=${sorted}&genre=${genre}&query_term=${string}&order_by=${order}`
        ).then((res) => {
          setAllMovies(res.data.data.movie_count);
          setvalue(res.data.data.movies);
        });
      }
    });
};

const Search = ({ num, handleChange, setMovies, setMovieCount }) => {
  const classes = useStyles();
  return (
    <>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
        }}
      >
        <Button
          style={{ backgroundColor: "#F3951F", color: "#E4E6EB" }}
          onClick={() =>
            searchFunction(
              num.order,
              num.rating,
              num.sorted,
              num.genre,
              setMovies,
              setMovieCount,
              num.search
            )
          }
          className={classes.btn}
          size="large"
          variant="outlined"
        >
          Search
        </Button>
        <TextField
          className={classes.search}
          size="small"
          id="outlined-basic"
          label="Search"
          InputLabelProps={{
            style: { color: "#D5D6DB" },
          }}
          name="search"
          value={num.search}
          onChange={handleChange}
          variant="outlined"
          // autoFocus={false}
        />
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
        }}
      >
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel color="primary">Rating</InputLabel>
          <Select
            name="rating"
            variant="outlined"
            label="Rating"
            value={num.rating}
            onChange={handleChange}
          >
            <MenuItem className={classes.MenuItem} value={0}>
              <em>None</em>
            </MenuItem>
            <MenuItem className={classes.MenuItem} value={1}>
              +1
            </MenuItem>
            <MenuItem className={classes.MenuItem} value={2}>
              +2
            </MenuItem>
            <MenuItem className={classes.MenuItem} value={3}>
              +3
            </MenuItem>
            <MenuItem className={classes.MenuItem} value={4}>
              +4
            </MenuItem>
            <MenuItem className={classes.MenuItem} value={5}>
              +5
            </MenuItem>
            <MenuItem className={classes.MenuItem} value={6}>
              +6
            </MenuItem>
            <MenuItem className={classes.MenuItem} value={7}>
              +7
            </MenuItem>
            <MenuItem className={classes.MenuItem} value={8}>
              +8
            </MenuItem>
            <MenuItem className={classes.MenuItem} value={9}>
              +9
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="sorted">Sorted By</InputLabel>
          <Select
            id="sorted"
            name="sorted"
            variant="outlined"
            label="Sorted By"
            value={num.sorted}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="download_count">Downoald</MenuItem>
            <MenuItem value="like_count">Liked</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="seeds">Seeds</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="order">Order By</InputLabel>
          <Select
            id="order"
            name="order"
            variant="outlined"
            label="Order by"
            value={num.order}
            onChange={handleChange}
          >
            <MenuItem value="asc">Asc</MenuItem>
            <MenuItem value="desc">Desc</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Genre</InputLabel>
          <Select
            //
            name="genre"
            variant="outlined"
            label="Genre"
            value={num.genre}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Adventure">Adventure</MenuItem>
            <MenuItem value="Animation">Animation</MenuItem>
            <MenuItem value="Biography">Biography</MenuItem>
            <MenuItem value="Comedy">Comedy</MenuItem>
            <MenuItem value="Crime">Crime</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Fantasy">Fantasy</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
            <MenuItem value="Romance">Remance</MenuItem>
            <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
            <MenuItem value="Superhero">Super-Hero</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default Search;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#D5D6DB",
      },
      "&:hover fieldset": {
        borderColor: "#D5D6DB",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f50057",
      },
    },
    "& .MuiInputBase-input": {
      color: "#D5D6DB",
    },
    "& .MuiSelect-icon": {
      color: "#D5D6DB",
    },
    "& .MuiInputLabel-formControl": {
      color: "#D5D6DB",
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  MenuItem: {
    justifyContent: "center",
  },
  btn: {
    margin: theme.spacing(1),
  },
  search: {
    margin: theme.spacing(1),
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#D5D6DB",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f50057",
      },
      "&:hover fieldset": {
        borderColor: "#f50057",
      },
    },
    "& .MuiInputBase-input": {
      color: "#D5D6DB",
    },
  },
}));

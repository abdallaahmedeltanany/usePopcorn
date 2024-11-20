import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import Logo from "./components/logo/Logo";
import Search from "./components/search/Search";
import Results from "./components/results/Results";
import ListBox from "./components/listbox/ListBox";
import MovieList from "./components/movieList/MovieList";
import WatchedSummary from "./components/watchedBox/WatchedSummary";
import WatchedMovieList from "./components/watchedBox/WatchedMovieList";
import Loader from "./components/loader/Loader";
import Error from "./components/error/Error"; // Ensure this path and component are correct
import ErrorMessage from "./components/error/ErrorMessage";
import MovieDetails from "./components/movieDetails/MovieDetails";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = "e6a525d4";
const tempQuery = "interstellar";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const handleSelectId = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleClose = () => {
    setSelectedId(null);
  };
  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const handleDelete = (id) => {
    setWatched(watched.filter((movie) => movie.imbdID !== id));
    console.log(id);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        console.log(data);
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar movies={movies}>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </Navbar>
      <Main>
        <ListBox>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectId={handleSelectId} />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleClose={handleClose}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} average={average} />
              <WatchedMovieList watched={watched} handleDelete={handleDelete} />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}

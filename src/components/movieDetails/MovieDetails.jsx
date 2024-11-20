import React, { useEffect, useState } from "react";
import StarsRating from "../starsRating/StarsRating";
import Loader from "../loader/Loader";
import Error from "../error/Error";

const MovieDetails = ({ selectedId, handleClose, onAddWatched, watched }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [movieError, setMovieError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState();
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  const key = "e6a525d4";
  const isWatched = watched.map((movie) => movie.imbdID).includes(selectedId);
  const watchedUSerRating = watched.find(
    (movie) => movie.imbdID === selectedId
  )?.userRating;

  useEffect(() => {
    const controller = new AbortController();
    const getMovieDetails = async () => {
      setIsLoading(true);
      setMovieError("");
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setMovieDetails(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
        setMovieError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
    return function () {
      controller.abort();
    };
  }, [selectedId]);
  const handleAdd = () => {
    const newWatchedMovie = {
      imbdID: selectedId,
      title,
      year,
      poster,
      imbdRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    handleClose();
  };
  useEffect(() => {
    document.title = ` movie|${title}`;
    return function () {
      document.title = "UsePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : movieError ? (
        <Error message={movieError} />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClose}>
              &larr;
            </button>
            <img src={poster} alt={`the poster of the ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} imdb Rating
              </p>
            </div>
          </header>
          <section>
            {" "}
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarsRating
                    maxRating={10}
                    messages={["terrible", "bad", "okay", "good", "amazing"]}
                    setUserRate={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  you rated with movie {watchedUSerRating} <span>⭐️</span>
                </p>
              )}{" "}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;

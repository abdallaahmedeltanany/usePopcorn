import React, { useState } from "react";
import Movie from "./Movie";

const MovieList = ({ movies, handleSelectId }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectId={handleSelectId}
        />
      ))}
    </ul>
  );
};

export default MovieList;

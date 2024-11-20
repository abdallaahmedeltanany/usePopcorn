import React from "react";

const WatchedMovie = ({ movie, handleDelete }) => {
  return (
    <li key={movie.imbdID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imbdRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDelete(movie.imbdID)}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default WatchedMovie;

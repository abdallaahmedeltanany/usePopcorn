import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({ watched, rate, handleDelete }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} rate={rate} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default WatchedMovieList;

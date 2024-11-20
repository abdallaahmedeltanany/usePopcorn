import React from "react";

const Error = ({ message }) => {
  return (
    <p className="error">
      {message === "Failed to fetch" ? "Failed to fetch" : "movie is not found"}
    </p>
  );
};

export default Error;

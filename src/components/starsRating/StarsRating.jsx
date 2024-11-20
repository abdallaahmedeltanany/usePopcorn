import React, { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const starContainerStyle = {
  display: "flex",
  gap: "4px",
};
const textStyle = {
  lineHight: "0px",
  margin: "1",
};

const StarsRating = ({ maxRating = 5, messages, setUserRate }) => {
  const [rating, setRating] = useState(0);
  const [full, setFull] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
    setUserRate(rate);
  };
  StarsRating.propTypes = {
    maxRating: PropTypes.number,
  };

  return (
    <div className="stars-container" style={containerStyle}>
      <div className="stars" style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            onRate={() => handleRating(i + 1)}
            full={full ? full >= i + 1 : rating >= i + 1}
            onHover={() => setFull(i + 1)}
            onHoverOut={() => setFull(0)}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[rating - 1]
          : full || rating || ""}
      </p>
    </div>
  );
};

export default StarsRating;

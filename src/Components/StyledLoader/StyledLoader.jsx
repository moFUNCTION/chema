import React from "react";
import "./style.css";
export const StyledLoader = ({ ...rest }) => {
  return (
    <div className="loader" {...rest}>
      <div className="book-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 126 75"
          className="book"
        >
          <rect
            strokeWidth={5}
            stroke="blue"
            rx="7.5"
            height={70}
            width={121}
            y="2.5"
            x="2.5"
          />
          <line strokeWidth={5} stroke="darkBlue" y2={75} x2="63.5" x1="63.5" />
          <path
            strokeLinecap="round"
            strokeWidth={4}
            stroke="blue"
            d="M25 20H50"
          />
          <path
            strokeLinecap="round"
            strokeWidth={4}
            stroke="blue"
            d="M101 20H76"
          />
          <path
            strokeLinecap="round"
            strokeWidth={4}
            stroke="blue"
            d="M16 30L50 30"
          />
          <path
            strokeLinecap="round"
            strokeWidth={4}
            stroke="blue"
            d="M110 30L76 30"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff74"
          viewBox="0 0 65 75"
          className="book-page"
        >
          <path
            strokeLinecap="round"
            strokeWidth={4}
            stroke="blue"
            d="M40 20H15"
          />
          <path
            strokeLinecap="round"
            strokeWidth={4}
            stroke="blue"
            d="M49 30L15 30"
          />
          <path
            strokeWidth={5}
            stroke="blue"
            d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"
          />
        </svg>
      </div>
    </div>
  );
};

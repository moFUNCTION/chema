import React, { useEffect, useState } from "react";

export const useTimer = ({ quizTime, onTimeEnd }) => {
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (typeof quizTime === "number") {
      setTimer(quizTime * 60);
      // Only start the timer if quizTime is a number
      const intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(intervalId); // Stop the timer when it reaches 0
            onTimeEnd();
            return prev;
          }
        });
      }, 1000);

      // Cleanup function to clear the interval
      return () => clearInterval(intervalId);
    }
  }, [quizTime]);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return {
    seconds: timer,
    formattedTime,
  };
};

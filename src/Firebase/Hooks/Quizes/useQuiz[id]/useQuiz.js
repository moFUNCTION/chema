import React, { useEffect, useReducer } from "react";
import { GetQuizReducer, INITIAL_STATE } from "./Reducer/GetQuizReducer";
import { db } from "../../../Config/Config";
import { doc, getDoc } from "firebase/firestore";
export const useQuiz = ({ id }) => {
  const [quize, dispach] = useReducer(GetQuizReducer, INITIAL_STATE);
  const GetQuizData = async () => {
    try {
      const QuizDoc = doc(db, "quizes", id);
      dispach({
        type: "FETCH_START",
      });
      const QuizData_res = await getDoc(QuizDoc);
      if (QuizData_res.exists()) {
        dispach({
          type: "FETCH_SUCCESS",
          payload: { ...QuizData_res.data(), id: QuizData_res.id },
        });
      } else {
        dispach({
          type: "FETCH_ERROR",
          payload: "this quiz doesnt exist",
        });
      }
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  useEffect(() => {
    GetQuizData();
  }, [id]);
  return quize;
};

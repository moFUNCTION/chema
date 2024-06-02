import React, { useEffect, useReducer } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../Config/Config";
import {
  GetCourseQuizesReducer,
  INITIAL_STATE,
} from "./Reducer/GetCourseQuizesReducer";

export const useCourseQuizes = ({ courseId }) => {
  const [quizes, dispach] = useReducer(GetCourseQuizesReducer, INITIAL_STATE);
  const getCourseQuizes = async () => {
    try {
      dispach({
        type: "FETCH_START",
      });
      const quizesRef = collection(db, `courses/${courseId}/quizes`);
      const q = query(quizesRef, orderBy("createdAt", "desc"));
      const { docs } = await getDocs(q);
      const quizesData = docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      dispach({
        type: "FETCH_SUCCESS",
        payload: quizesData,
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  useEffect(() => {
    getCourseQuizes();
  }, []);
  return quizes;
};

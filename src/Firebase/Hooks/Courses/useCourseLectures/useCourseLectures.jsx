import React, { useEffect, useReducer } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../Config/Config";
import {
  GetCourseLecturesReducer,
  INITIAL_STATE,
} from "./Reducer/GetCourseQuizesReducer";

export const useCourseLectures = ({ courseId }) => {
  const [lessons, dispach] = useReducer(
    GetCourseLecturesReducer,
    INITIAL_STATE
  );
  const getCourseLessons = async () => {
    try {
      dispach({
        type: "FETCH_START",
      });
      const LessonsRef = collection(db, `courses/${courseId}/lessons`);
      const q = query(LessonsRef, orderBy("createdAt", "desc"));
      const { docs } = await getDocs(q);
      const lessonsData = docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      dispach({
        type: "FETCH_SUCCESS",
        payload: lessonsData,
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  useEffect(() => {
    getCourseLessons();
  }, []);
  return lessons;
};

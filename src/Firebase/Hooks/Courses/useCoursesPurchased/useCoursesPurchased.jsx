import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import { GetCoursesReducer, INITIAL_STATE } from "./Reducer/GetCoursesReducer";
import { db } from "../../../Config/Config";

export const useCoursesPurchased = ({ userID }) => {
  const [courses, dispach] = useReducer(GetCoursesReducer, INITIAL_STATE);
  const getCourses = async () => {
    try {
      dispach({
        type: "FETCH_START",
      });
      const coursesPurchasedRef = collection(
        db,
        `users/${userID}/coursesPurchased`
      );
      const { docs } = await getDocs(coursesPurchasedRef);
      const CoursesPurchased = docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      const coursesRef = collection(db, "courses");
      const coursesPurchasedQuery = query(
        coursesRef,
        where(
          "__name__",
          "in",
          CoursesPurchased.map((doc) => {
            return doc.id;
          })
        ),
        orderBy("createdAt", "desc")
      );
      const { docs: coursesDocs } = await getDocs(coursesPurchasedQuery);
      const coursesRes = coursesDocs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      const data = coursesRes.map((course) => {
        return {
          ...course,
          ...CoursesPurchased.find((doc) => {
            return doc.id === course.id;
          }),
        };
      });
      dispach({
        type: "FETCH_SUCCESS",
        payload: data,
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
      console.log(err);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);
  return courses;
};

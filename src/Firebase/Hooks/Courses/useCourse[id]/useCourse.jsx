import React, { useEffect, useReducer } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Config/Config";
import { GetCourseReducer, INITIAL_STATE } from "./Reducer/GetCourseReducer";
export const useCourse = ({ id }) => {
  const [course, dispach] = useReducer(GetCourseReducer, INITIAL_STATE);
  const GetVideo_req = async () => {
    const courseoDoc = doc(db, "courses", id);
    try {
      dispach({
        type: "FETCH_START",
      });
      const GetVideo_res = await getDoc(courseoDoc);
      if (!GetVideo_res.exists()) {
        dispach({
          type: "FETCH_ERROR",
          payload: "لم يتم العثور علي ذلك الكورس",
        });
        return;
      }
      dispach({
        type: "FETCH_SUCCESS",
        payload: GetVideo_res.data(),
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code || err,
      });
    }
  };
  useEffect(() => {
    GetVideo_req();
  }, [id]);
  return course;
};

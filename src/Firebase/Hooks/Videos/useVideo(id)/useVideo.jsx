import React, { useEffect, useReducer } from "react";
import { GetVideoReducer, INITIAL_STATE } from "./Reducer/GetVideoReducer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Config/Config";
export const useVideo = ({ id }) => {
  const [video, dispach] = useReducer(GetVideoReducer, INITIAL_STATE);
  const GetVideo_req = async () => {
    const videoDoc = doc(db, "lessons", id);

    try {
      dispach({
        type: "FETCH_START",
      });
      const GetVideo_res = await getDoc(videoDoc);
      if (GetVideo_res.exists()) {
        dispach({
          type: "FETCH_SUCCESS",
          payload: GetVideo_res.data(),
        });
      } else {
        dispach({
          type: "FETCH_ERROR",
          payload: "there is no video have this id",
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
    GetVideo_req();
  }, [id]);
  return video;
};

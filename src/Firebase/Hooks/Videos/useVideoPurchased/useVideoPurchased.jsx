import React, { useEffect, useReducer } from "react";
import {
  GetVideosPurchasedReducer,
  INITIAL_STATE,
} from "./Reducer/GetVideosPurchased";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../Config/Config";

export const useVideoPurchased = ({ user }) => {
  const [videosPurchased, dispach] = useReducer(
    GetVideosPurchasedReducer,
    INITIAL_STATE
  );
  const HandleGetVideoPurchased = async () => {
    try {
      const VideosRef = user.VideosPurchased.map((videoID) => {
        return doc(db, "lessons", videoID);
      });
      const VideosPurchasedCollction = collection(db, "lessons");
      dispach({
        type: "FETCH_START",
      });
      const VideosPurchased_res = await getDocs(
        VideosPurchasedCollction,
        ...VideosRef
      );
      const Data = VideosPurchased_res.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      dispach({
        type: "FETCH_SUCCESS",
        payload: Data,
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  useEffect(() => {
    HandleGetVideoPurchased();
  }, []);
  return videosPurchased;
};

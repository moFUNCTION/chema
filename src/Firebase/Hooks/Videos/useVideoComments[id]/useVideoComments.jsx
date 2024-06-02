import React, { useEffect } from "react";
import { useReducer } from "react";
import {
  GetVideCommentsoReducer,
  INITIAL_STATE,
} from "./Reducer/GetVideoComments";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../Config/Config";

export const useVideoComments = ({ LessonId }) => {
  const [comments, dispach] = useReducer(
    GetVideCommentsoReducer,
    INITIAL_STATE
  );
  const HandleGetComments = async () => {
    const CommentsCollection = collection(db, "VideosComments");
    const q = query(
      CommentsCollection,
      where("lessonID", "==", LessonId),
      orderBy("createdAt")
    );
    onSnapshot(
      q,
      (snapshot) => {
        dispach({
          type: "FETCH_START",
        });
        const Data = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        dispach({
          type: "FETCH_SUCCESS",
          payload: Data,
        });
      },
      (err) => {
        dispach({
          type: "FETCH_ERROR",
          payload: err.code.message || err.message,
        });
      }
    );
  };
  useEffect(() => {
    HandleGetComments();
  }, [LessonId]);
  return comments;
};

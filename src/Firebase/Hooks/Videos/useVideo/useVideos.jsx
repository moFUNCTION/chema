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
import { db } from "../../../Config/Config";
import { GetVideoReducer, INITIAL_STATE } from "./Reducer/GetVideosReducer";

export const useVideos = ({ grade, size }) => {
  const [video, dispach] = useReducer(GetVideoReducer, INITIAL_STATE);
  const VideosCollection = collection(db, "lessons");
  const [queryRef, setQueryRef] = useState(
    query(
      VideosCollection,
      orderBy("createdAt", "desc"),
      where("grade", "==", grade),
      limit(size)
    )
  );
  const HandleGetLessons = async () => {
    dispach({
      type: "FETCH_START",
    });
    onSnapshot(
      queryRef,
      (lessons_res) => {
        dispach({
          type: "FETCH_SUCCESS",
          payload: lessons_res.docs,
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
    HandleGetLessons();
  }, [queryRef]);
  useEffect(() => {
    setQueryRef(
      query(
        VideosCollection,
        orderBy("createdAt", "desc"),
        where("grade", "==", grade),
        limit(size)
      )
    );
    dispach({
      type: "PAGE_RESET",
    });
  }, [grade]);
  const HandleGetNextPage = () => {
    setQueryRef(
      query(
        VideosCollection,
        orderBy("createdAt", "desc"),
        where("grade", "==", grade),
        limit(size),
        startAfter(video.data[video.data.length - 1])
      )
    );
    dispach({
      type: "NEXT_PAGE",
    });
  };
  const HandleGetPreviousPage = () => {
    setQueryRef(
      query(
        VideosCollection,
        orderBy("createdAt", "desc"),
        where("grade", "==", grade),
        endBefore(video.data[0]),
        limitToLast(size)
      )
    );
    dispach({
      type: "PREVIOUS_PAGE",
    });
  };
  return {
    data: video.data.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }),
    error: video.error,
    loading: video.loading,
    HandleGetNextPage,
    HandleGetPreviousPage,
    page: video.page,
  };
};

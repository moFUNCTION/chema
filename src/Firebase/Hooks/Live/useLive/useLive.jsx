import React, { useEffect, useReducer } from "react";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../Config/Config";
import { GetLiveReducer, INITIAL_STATE } from "./Reducer/GetLiveReducer";
export const useLive = ({ grade }) => {
  const [live, dispach] = useReducer(GetLiveReducer, INITIAL_STATE);
  const HandleGetLive = async () => {
    const LivesRef = collection(db, "lives");
    dispach({
      type: "FETCH_START",
    });
    const q = query(
      LivesRef,
      orderBy("createdAt", "desc"),
      limit(1),
      where("grade", "==", grade)
    );
    onSnapshot(
      q,
      (res) => {
        if (!res.docs[0]?.exists()) {
          dispach({
            type: "FETCH_ERROR",
            payload: "no live found",
          });
          return;
        }
        dispach({
          type: "FETCH_SUCCESS",
          payload: { ...res.docs[0].data(), id: res.docs[0].id },
        });
      },
      (err) => {
        dispach({
          type: "FETCH_ERROR",
          payload: err.code?.message || err.message,
        });
        console.log(err);
      }
    );
  };
  useEffect(() => {
    HandleGetLive();
  }, []);
  return live;
};

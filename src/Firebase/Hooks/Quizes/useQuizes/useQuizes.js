import React, { useEffect, useReducer } from "react";
import { GetQuizesReducer, INITIAL_STATE } from "./Reducer/GetQuizesReducer";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../../Config/Config";
export const useQuizes = ({ grade, size }) => {
  const [quizes, dispach] = useReducer(GetQuizesReducer, INITIAL_STATE);
  const HandleGetFirstQuizes = async () => {
    try {
      const QuizesCollection = collection(db, "quizes");
      const q = query(
        QuizesCollection,
        orderBy("createdAt", "desc"),
        where("grade", "==", grade),
        limit(size)
      );
      dispach({
        type: "FETCH_START",
      });
      const res = await getDocs(q);
      const Data = res.docs;
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
    HandleGetFirstQuizes();
  }, []);
  const HandleGetNextQuizes = async () => {
    try {
      const QuizesCollection = collection(db, "quizes");
      const q = query(
        QuizesCollection,
        orderBy("createdAt", "desc"),
        where("grade", "==", grade),
        limit(size),
        startAfter(quizes.data[quizes.data.length - 1])
      );
      dispach({
        type: "FETCH_START",
      });
      const res = await getDocs(q);
      const Data = res.docs;
      dispach({
        type: "FETCH_MORE",
        payload: Data,
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  return {
    data: quizes.data.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }),
    loading: quizes.loading,
    error: quizes.error,
    HandleGetNext: HandleGetNextQuizes,
  };
};

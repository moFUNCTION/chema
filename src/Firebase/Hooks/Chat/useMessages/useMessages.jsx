import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../../Config/Config.js";
import { useReducer } from "react";
import {
  GetMessagesReducer,
  INITIAL_STATE,
} from "./Reducer/GetMessagesReducer.js";
import { useEffect } from "react";
export const useMessages = ({ grade }) => {
  const [messages, dispach] = useReducer(GetMessagesReducer, INITIAL_STATE);
  //   message firebase ref
  const MessagesRef = collection(db, "messages");
  //   quiery on messages that have equal grades and ordered by time
  const q = query(
    MessagesRef,
    orderBy("createdAt", "desc"),
    where("grade", "==", grade)
  );
  useEffect(() => {
    try {
      dispach({
        type: "FETCH_START",
      });
      onSnapshot(q, (res) => {
        const Data = res.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          .reverse();
        dispach({
          type: "FETCH_SUCCESS",
          payload: Data,
        });
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
      });
    }
  }, [grade]);
  return messages;
};

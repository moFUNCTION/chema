import React, { useEffect, useReducer } from "react";
import { collection, getCountFromServer, doc } from "firebase/firestore";
import { db } from "../../Config/Config";
import { GetCountReducer, INITIAL_STATE } from "./reducer/GetCountReducer";
export const useCollectionCount = ({ path }) => {
  const [count, dispach] = useReducer(GetCountReducer, INITIAL_STATE);
  const GetCollectionCount = async () => {
    try {
      dispach({
        type: "FETCH_START",
      });
      const collection_ref = collection(db, path);
      const getCount_req = await getCountFromServer(collection_ref);
      dispach({
        type: "FETCH_SUCCESS",
        payload: getCount_req.data().count,
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  useEffect(() => {
    GetCollectionCount();
  }, []);
  return count;
};

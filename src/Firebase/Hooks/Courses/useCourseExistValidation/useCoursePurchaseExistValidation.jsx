import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import { db } from "../../../Config/Config";

export const useCoursePurchaseExistValidation = ({ userId, courseId }) => {
  const [status, setStatus] = useState("loading");
  const [isPurchased, setIsPurchased] = useState(false);
  const getCourse = async () => {
    try {
      const courseRef = doc(db, `users/${userId}/coursesPurchased/${courseId}`);
      setStatus("loading");
      const courseRes = await getDoc(courseRef);
      setStatus("idle");
      if (courseRes.exists()) {
        setIsPurchased(true);
      }
    } catch (err) {
      setStatus("error");
    }
  };
  useEffect(() => {
    getCourse();
  }, []);
  return { status, isPurchased };
};

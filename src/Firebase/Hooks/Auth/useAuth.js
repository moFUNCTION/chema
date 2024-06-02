import { useCallback, useEffect, useReducer } from "react";
import { GetUserDataReducer, INITIAL_STATE } from "./Reducer/GetUserReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../Firebase/Config/Config";
import { doc, getDocs } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
export const useAuth = () => {
  const [user, dispach] = useReducer(GetUserDataReducer, INITIAL_STATE);
  const GetUserAditionalData = async (user) => {
    try {
      const User_Doc = doc(db, "users", user.uid);
      const UserData_res = await getDoc(User_Doc);
      dispach({
        type: "FETCH_SUCCESS",
        paylaod: Object.assign(user, UserData_res.data()),
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
      });
    }
  };
  const GetUserData = (user) => {
    dispach({
      type: "FETCH_START",
    });
    if (user) {
      GetUserAditionalData(user);
    } else {
      dispach({
        type: "FETCH_SUCCESS",
        paylaod: auth.currentUser,
      });
    }
  };
  const HandleError = () => {
    dispach({
      type: "FETCH_ERROR",
    });
  };
  const HandleRender = () => {
    dispach({
      type: "FETCH_RENDER",
    });
  };
  useEffect(() => {
    onAuthStateChanged(auth, GetUserData, HandleError);
  }, [user.render]);
  return { user, HandleRender };
};

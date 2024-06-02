import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Config/Config";
export const CheckIfUserExist = async ({ id }) => {
  const User = doc(db, "users", id);
  const res = await getDoc(User);
  return res.exists();
};

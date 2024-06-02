import { signOut } from "firebase/auth";
import { auth, db } from "../../../Config/Config";
import { deleteDoc, doc } from "firebase/firestore";
export const LogoutRequist = async ({ user }) => {
  const req = await signOut(auth);
};

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../Config/Config";
export const ResetPassword_req = async ({ email }) => {
  try {
    if (!email) {
      throw new Error("please enter valid email");
    }
    const req = await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw new Error(err.code || err);
  }
};

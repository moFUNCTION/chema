import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/Config";
export const CodeRedeem_req = async ({ code, user }) => {
  try {
    if (code.length >= 1) {
      const userDoc = doc(db, "users", user.uid);
      const CodeDoc = doc(db, "codes", code);
      const Code_res = await getDoc(CodeDoc);
      if (!Code_res.exists()) {
        throw new Error("in-valid code");
      }
      if (Code_res.data().grade !== user.grade) {
        throw new Error("this code is not for this grade");
      }
      if (Code_res.data().isRedeemed === true) {
        throw new Error("this code has been redeemed before");
      }
      const UpdateUserPoints = await updateDoc(userDoc, {
        points: Number(user.points) + Number(Code_res.data().points),
      });
      const UpdateCodeDoc = await updateDoc(CodeDoc, {
        isRedeemed: true,
      });
    } else {
      throw new Error("please insert the code");
    }
  } catch (err) {
    throw new Error(err.code || err);
  }
};

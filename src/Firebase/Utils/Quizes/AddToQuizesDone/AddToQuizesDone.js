import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Config/Config";
export const AddToQuizesDone = async ({ user, QuizId, result }) => {
  const userRef = doc(db, "users", user.uid);
  try {
    const updateUserDoc = await updateDoc(userRef, {
      QuizesDone: arrayUnion({ id: QuizId, result }),
      QuizesDoneCount: user.QuizesDoneCount + 1,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.code || err);
  }
};

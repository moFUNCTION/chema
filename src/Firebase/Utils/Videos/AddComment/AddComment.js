import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Config/Config";
export const AddComment = async ({ lessonID, user, comment }) => {
  const VideosComments = collection(db, "VideosComments");
  try {
    try {
      const AddCommentToFireBaseDoc = await addDoc(VideosComments, {
        comment: comment,
        user: {
          email: user.email,
          photoURL: user.photoURL,
          grade: user.grade,
          displayName: user.displayName,
        },
        lessonID: lessonID,
        createdAt: serverTimestamp(),
      });
      return AddCommentToFireBaseDoc;
    } catch (err) {
      console.log(err);
      throw new Error(err.code || err);
    }
  } catch (err) {
    const ErrorMessage = err.code ? err.code : err;
    throw new Error(ErrorMessage);
  }
};

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Config/Config";
export const PurchaseVideo = async ({ user, VideoID }) => {
  const userRef = doc(db, "users", user.uid);
  const VideoRef = doc(db, "lessons", VideoID);
  try {
    const Video_Data = await getDoc(VideoRef);
    if (!Video_Data.exists()) {
      throw new Error("video not found");
    }
    if (user.points < Video_Data.data().RequiredPoints) {
      throw new Error("user not have enough points to purchase video");
    }
    const AddVideoToUserDoc = await updateDoc(userRef, {
      points: user.points - Video_Data.data().RequiredPoints,
      VideosPurchased: arrayUnion(VideoRef.id),
      VideosPurchasedCount: user.VideosPurchasedCount + 1,
    });
  } catch (err) {
    throw new Error(err.code || err);
  }
};

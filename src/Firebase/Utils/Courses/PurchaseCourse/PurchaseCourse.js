import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Config/Config";
const getFirestoreData = async (ref) => {
  const data = await getDoc(ref);
  return { ...data.data(), id: data.id, exists: data.exists() };
};
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
export const PurchaseCourse = async ({ userId, CourseId }) => {
  try {
    const userRef = doc(db, "users", userId);
    const CourseRef = doc(db, "courses", CourseId);
    const userData = await getFirestoreData(userRef);
    const CourseData = await getFirestoreData(CourseRef);
    if (!CourseData.exists) {
      throw new Error("course not found");
    }
    if (userData.points < CourseData.points) {
      throw new Error("user not have enough points to purchase video");
    }
    const userCoursePurchasedRef = doc(
      db,
      `users/${userId}/coursesPurchased`,
      CourseId
    );
    const req = await Promise.all([
      updateDoc(userRef, {
        points: userData.points - CourseData.points,
      }),
      setDoc(userCoursePurchasedRef, {
        lessonsCompleted: [],
        quizesCompleted: [],
        totalHoursWatched: 0,
        points: CourseData.points,
        isBanned: false,
        purchasedAt: serverTimestamp(),
        expireTime: 10,
      }),
    ]);
  } catch (err) {
    throw new Error(err.code || err);
  }
};

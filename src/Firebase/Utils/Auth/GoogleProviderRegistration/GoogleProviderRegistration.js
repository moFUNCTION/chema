import { signInWithPopup } from "firebase/auth";
import { auth, db, googleAuth } from "../../../Config/Config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export class GoogleProviderRegistration {
  #collection = "users";
  constructor({ grade }) {
    this.grade = grade;
  }
  async #CheckIfUserExist(uid) {
    const userRef = doc(db, this.#collection, uid);
    const user = await getDoc(userRef);
    if (user.exists()) {
      return true;
    }
    return false;
  }
  async #saveUserToDb({ uid, email, photoURL, displayName, grade }) {
    const userRef = doc(db, this.#collection, uid);
    const AddUserTo_Db = await setDoc(userRef, {
      email: email,
      photoURL: photoURL,
      displayName: displayName,
      grade: grade,
      password: "not-provided",
      provider: "google-auth",
      phoneNumber: "not-provided",
      parentPhoneNumber: "not-provided",
      points: 0,
      VideosPurchased: [],
      QuizesDone: [],
      VideosPurchasedCount: 0,
      QuizesDoneCount: 0,
      createdAt: serverTimestamp(),
    });
    return AddUserTo_Db;
  }
  async requist() {
    try {
      const connect_req = await signInWithPopup(auth, googleAuth);
      const isUserExised = await this.#CheckIfUserExist(connect_req.user.uid);
      if (!isUserExised) {
        const saveToDb = await this.#saveUserToDb({
          uid: connect_req.user.uid,
          email: connect_req.user.email,
          photoURL: connect_req.user.photoURL,
          displayName: connect_req.user.displayName,
          grade: this.grade,
        });
      }
      return `connect With google Successfully , Hi ${
        connect_req.user.displayName || connect_req.user.email
      }`;
    } catch (err) {
      throw new Error(err.code || err);
    }
  }
}

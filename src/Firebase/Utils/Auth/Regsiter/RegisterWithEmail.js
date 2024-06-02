import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../../Config/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Validator } from "./Validator";

export class RegisterWithEmail {
  constructor({
    email,
    password,
    grade,
    phoneNumber,
    parentPhoneNumber,
    username,
  }) {
    this.email = email;
    this.password = password;
    this.grade = grade;
    this.phoneNumber = phoneNumber;
    this.parentPhoneNumber = parentPhoneNumber;
    this.displayName = username;
  }
  #collection = "users";
  #UploadImage() {
    return `https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${Math.random().toString()}`;
  }
  #ValidationError() {
    const errors = Validator({
      email: this.email,
      password: this.password,
      grade: this.grade,
      phoneNumber: this.phoneNumber,
      parentPhoneNumber: this.parentPhoneNumber,
      username: this.displayName,
    });
    return errors;
  }
  async #saveToFirestore({ uid, photoURL }) {
    const userRef = doc(db, this.#collection, uid);
    const AddUserTo_Db = await setDoc(userRef, {
      email: this.email,
      photoURL,
      displayName: this.displayName,
      grade: this.grade,
      provider: "email",
      phoneNumber: this.phoneNumber,
      parentPhoneNumber: this.parentPhoneNumber,
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
    if (!this.#ValidationError()) {
      try {
        const signUpReq = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const Image = this.#UploadImage();
        const saveToDb = await this.#saveToFirestore({
          uid: signUpReq.user.uid,
          photoURL: Image,
        });
        return `sign up Successfully , Hi ${
          signUpReq.user.displayName || signUpReq.user.email
        }`;
      } catch (err) {
        throw new Error(err.code || err);
      }
    }
    throw new Error(this.#ValidationError());
  }
}

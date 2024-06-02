import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, storage, googleAuth } from "../../../Config/Config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CheckIfUserExist } from "../CheckIfUserExist/CheckIfUserExist";
import { GoogleProviderRegistration } from "../GoogleProviderRegistration/GoogleProviderRegistration";
import { RegisterWithEmail } from "./RegisterWithEmail";

export const RegsiterRequist = async ({ form, withGoogle }) => {
  if (withGoogle) {
    const signUp = new GoogleProviderRegistration({ grade: form.grade });
    const req = await signUp.requist();
    return req;
  } else {
    const signUp = new RegisterWithEmail({
      email: form.email,
      password: form.password,
      grade: form.grade,
      phoneNumber: form.phoneNumber,
      parentPhoneNumber: form.parentPhoneNumber,
      username: form.username,
    });
    const req = await signUp.requist();
    return req;
  }
};

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../../Config/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
export const AddMessage = async ({ user, Message, File }) => {
  const MessagesRef = collection(db, "messages");
  if (user && Message) {
    if (!File) {
      try {
        const res = await addDoc(MessagesRef, {
          username: user.displayName,
          UserImage: user.photoURL,
          email: user.email,
          grade: user.grade,
          message: Message,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        throw new Error(err.code);
      }
    } else {
      const imageRef = ref(storage, `messages/${File.name + v4()}`);
      try {
        const FileRes = await uploadBytes(imageRef, File);
        const Url = await getDownloadURL(FileRes.ref);
        console.log(Url);
        const DocumnetRes = await addDoc(MessagesRef, {
          username: user.displayName,
          UserImage: user.photoURL,
          email: user.email,
          grade: user.grade,
          message: Message,
          FileImage: Url,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        throw new Error(err.code);
      }
    }
  } else {
    return "user or message doesnt exist";
  }
};

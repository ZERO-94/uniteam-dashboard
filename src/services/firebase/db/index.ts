import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "../firebase";
import { User } from "firebase/auth";

const db = getFirestore(app);

const USERS_COLLECTION = "users";

export type UserDB = {
  id: string;
  email: string;
  displayName: string;
  photoUrl: string;
  providerId: string;
  isDonator: boolean;
};

const login = async (user: User) => {
  const userRef = doc(db, USERS_COLLECTION, user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) return userSnap.data();

  const usersCollectionRef = collection(db, USERS_COLLECTION);
  try {
    await setDoc(doc(usersCollectionRef, user.uid), {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      providerId: user.providerId,
      isDonator: true,
    });
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) return userSnap.data();
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { login };

export default db;

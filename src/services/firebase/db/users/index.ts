import { doc, updateDoc } from "firebase/firestore";
import db from "..";
import { USER_COLLECTION } from "../constants";

export const stopPremium = async (userId: string) => {
  const userRef = doc(db, USER_COLLECTION, userId);
  await updateDoc(userRef, {
    isDonator: false,
  });
};

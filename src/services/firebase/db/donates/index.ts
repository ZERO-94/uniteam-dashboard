import { doc, updateDoc } from "firebase/firestore";
import db from "..";
import { DONATE_COLLECTION, USER_COLLECTION } from "../constants";

export const evaluateDonate = async (
  userId: string,
  donateId: string,
  action: "APPROVED" | "REJECTED"
) => {
  const donateRef = doc(
    db,
    USER_COLLECTION,
    userId,
    DONATE_COLLECTION,
    donateId
  );
  await updateDoc(donateRef, {
    status: action,
  });
  const userRef = doc(db, USER_COLLECTION, userId);
  await updateDoc(userRef, {
    isDonator: true,
  });
};

import { Timestamp } from "firebase/firestore";

export type DonateDB = {
  id: string;
  ownerId: string;
  billingCode: string;
  createdAt: Timestamp;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export type Donate = DonateDB & {
  owner: UserDB;
};

export type UserDB = {
  id: string;
  email: string;
  displayName: string;
  photoUrl: string;
  providerId: string;
  isDonator: boolean;
};

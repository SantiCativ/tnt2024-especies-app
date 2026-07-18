import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/src/config/firebase";

export const login = async (
  email: string,
  password: string
) => {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log("User logged in:", credential.user);
  return credential.user;
};

export const logout = async () => {
  await signOut(auth);
};
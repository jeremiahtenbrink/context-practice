import React from "react";
import { useDoc } from "../hooks/useDoc";
import { store } from "../firebase/firebaseConfig";
import { IUser } from "../types/IUser";

export function useUserData(
  id,
): [boolean, IUser, boolean, (doc: any) => void, () => void] {
  let ref = null;
  if (id) {
    ref = store.collection("users").doc(id);
  }

  const [loading, userData, exsists, setDoc, delDoc] = useDoc(ref);

  return [loading, userData, exsists, setDoc, delDoc];
}

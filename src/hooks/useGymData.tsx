import React, { useState, useEffect } from "react";
import { useCollection } from "./useColletion";
import { store } from "../firebase/firebaseConfig";

export const useGymData = () => {
  const ref = store.collection("gyms");
  const [isLoading, data, addDoc, deleteDoc] = useCollection(ref);

  const addGym = gym => {
    addDoc({ name: gym });
  };

  const deleteGym = id => {
    deleteDoc(id);
  };

  const getGym = id => {
    return data[id];
  };

  return [data, addGym, getGym, deleteGym];
};

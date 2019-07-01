import React, { useContext, useState } from "react";
import firebase from "../firebase/firebaseConfig";
import { User } from "firebase";
import { History } from "history";

export const userContext = React.createContext({
  user: null,
  initializing: false,
});

export const useSession = () => {
  const { user } = useContext(userContext);
  return user;
};

export const useAuth = (history: History) => {
  const [state, setState] = useState(() => {
    const user: User = firebase.auth().currentUser;

    return { user, initializing: !user };
  });

  function onChange(user: User) {
    setState({ initializing: false, user });

    if (
      !user &&
      history.location.pathname !== "/signup" &&
      history.location.pathname !== "/login" &&
      history.location.pathname !== "/root"
    ) {
      history.push("/login");
    }
  }

  React.useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  return state;
};

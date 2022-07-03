// import * as Font from "expo-font";
import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { useDispatch, useSelector } from "react-redux";
// import { store } from "./redux/store";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/config";
import { authStateChangeUser } from "../redux/auth/authOperation";
import { stateChangeUser } from "../redux/auth/authSelectors";

const Main = () => {
  //   const [user, setUser] = useState(null);

  const changeUser = useSelector(stateChangeUser);
  console.log("changeUser :>> ", changeUser);
  const dispatch = useDispatch();

  //   onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

  const routing = useRoute(changeUser);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

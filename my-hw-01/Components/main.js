// import * as Font from "expo-font";
import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { useSelector } from "react-redux";
// import { store } from "./redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const Main = () => {
  const [user, setUser] = useState(null);

  const state = useSelector((state) => state);

  onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

  const routing = useRoute(user);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

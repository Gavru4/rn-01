// import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperation";
import { stateChangeUser } from "../redux/auth/authSelectors";

const Main = () => {
  const changeUser = useSelector(stateChangeUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(changeUser);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

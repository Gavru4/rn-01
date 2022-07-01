import * as Font from "expo-font";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}

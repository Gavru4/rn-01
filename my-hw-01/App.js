import * as Font from "expo-font";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";

// import { useRoute } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase/config.js";
import Main from "./Components/main";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

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
      <Main />
    </Provider>
  );
}

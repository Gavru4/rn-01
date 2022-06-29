import * as Font from "expo-font";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";

export default function App() {
  const loadFonts = async () => {
    await Font.loadAsync({
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    });
  };

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
    <>
      <RegistrationScreen />
    </>
  );
}

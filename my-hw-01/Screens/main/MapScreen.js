import {} from "react-native";
import { View, Text, StyleSheet } from "react-native";

const MapScreen = () => {
  return (
    <View styles={styles.container}>
      <Text>MapScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;

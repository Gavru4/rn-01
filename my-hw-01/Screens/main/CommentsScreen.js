import {} from "react-native";
import { View, Text, StyleSheet } from "react-native";

const CommentsScreen = () => {
  return (
    <View styles={styles.container}>
      <Text>CommentsScreen</Text>
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
export default CommentsScreen;

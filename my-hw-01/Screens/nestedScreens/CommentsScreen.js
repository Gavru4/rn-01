import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { getUserNickName } from "../../redux/auth/authSelectors";
import { FontAwesome5 } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { postId, uri } = route.params;

  const [comment, setComment] = useState("");
  const nickName = useSelector(getUserNickName);

  const createComments = async () => {
    await firestore
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickName });
    await setComment("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.userPhotoWrap}>
        <Image source={{ uri }} style={styles.userPhoto} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={setComment}
          placeholder="Comments..."
        />
        <TouchableOpacity onPress={() => createComments()}>
          <FontAwesome5 name="arrow-circle-up" size={34} color="#FF6C00" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
    paddingHorizontal: 16,
    // alignItems: "center"

    backgroundColor: "#FFFFFF",
  },
  userPhotoWrap: {
    flex: 1,
    justifyContent: "flex-start",
  },
  userPhoto: {
    height: 240,

    marginBottom: 10,

    borderRadius: 8,
  },
  inputContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,

    paddingLeft: 15,
    paddingRight: 5,
    paddingHorizontal: 10,

    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,

    color: "#BDBDBD",
  },
});
export default CommentsScreen;

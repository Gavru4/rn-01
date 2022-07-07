import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { getUserNickName } from "../../redux/auth/authSelectors";
import { FontAwesome5 } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { postId, uri } = route.params;

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const nickName = useSelector(getUserNickName);

  useEffect(() => {
    getAllComments();
  }, []);

  const createComments = async () => {
    await firestore
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickName });
    await setComment("");
  };

  const getAllComments = async () => {
    await firestore
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userPhotoWrap}>
        <Image source={{ uri }} style={styles.userPhoto} />
      </View>
      <SafeAreaView style={styles.flatListContainer}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.nickName}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
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
  commentContainer: {
    width: 300,
    marginBottom: 24,
    padding: 15,

    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
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

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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import {
  getUserAvatarImage,
  getUserNickName,
} from "../../redux/auth/authSelectors";
import { FontAwesome5 } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { postId, uri } = route.params;

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [currentData, setCurrentData] = useState("");

  const nickName = useSelector(getUserNickName);
  const avatarImage = useSelector(getUserAvatarImage);

  useEffect(() => {
    getAllComments();
  }, []);
  console.log("cura :>> ", currentData);

  const createComments = async () => {
    await getCurrentDate();
    console.log("currentData :>> ", currentData);
    await firestore
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickName, currentData });
    await setComment("");
    await setCurrentData("");
  };

  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    setCurrentData(
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    );
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.userPhotoWrap}>
            <Image source={{ uri }} style={styles.userPhoto} />
          </View>
          <SafeAreaView style={styles.flatListContainer}>
            <FlatList
              data={allComments}
              renderItem={({ item }) => (
                <View style={styles.commentWrap}>
                  <Image
                    source={{ uri: avatarImage }}
                    style={{ width: 30, height: 30, borderRadius: 50 }}
                  />
                  <View style={styles.commentContainer}>
                    <Text>{item.comment}</Text>
                    <Text>{item.currentData}</Text>
                  </View>
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
            <TouchableOpacity
              onPress={() => createComments()}
              style={styles.arrow}
            >
              <FontAwesome5 name="arrow-circle-up" size={34} color="#FF6C00" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingHorizontal: 16,
    // alignItems: "center",
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
    // width: "100%",
    marginBottom: 24,
    padding: 15,
    alignContent: "flex-start",
    marginRight: 15,

    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },
  commentWrap: {
    flexDirection: "row-reverse",
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
    width: "100%",
    fontFamily: "Roboto-Regular",
    fontSize: 16,

    color: "#BDBDBD",
  },
  arrow: {
    position: "absolute",
    right: 15,
  },
});
export default CommentsScreen;

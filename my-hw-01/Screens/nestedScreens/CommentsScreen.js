import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import {
  getUserAvatarImage,
  getUserNickName,
} from "../../redux/auth/authSelectors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const CommentsScreen = ({ route }) => {
  const { postId, uri, comments } = route.params;

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(comments ? comments : []);

  const nickName = useSelector(getUserNickName);
  const avatarImage = useSelector(getUserAvatarImage);

  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    return (
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    );
  };

  const addNewComment = async () => {
    const currentData = await getCurrentDate();

    if (comment !== "") {
      await firestore
        .collection("posts")
        .doc(postId)
        .update({
          comments: [...allComments, { comment, avatarImage, currentData }],
        });
      const data = await firestore.collection("posts").doc(postId).get();
      await setAllComments(data.data().comments);
      setComment("");
    } else Notify.failure("Empty comment");
  };

  const flatList = React.useRef(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
      style={styles.keybordContainer}
    >
      <View style={styles.container}>
        <View style={styles.userPhotoWrap}>
          <Image source={{ uri }} style={styles.userPhoto} />
        </View>

        {allComments && allComments.length !== 0 && (
          // <View style={styles.flatListWrap}>
          <FlatList
            data={allComments}
            keyExtractor={(item) => item.id}
            // style={{ minHeight: 250 }}
            ref={flatList}
            onContentSizeChange={() => {
              flatList.current.scrollToEnd({ animated: true });
            }}
            renderItem={({ item }) => (
              <View style={styles.commentWrap}>
                <Image
                  source={{ uri: item.avatarImage }}
                  style={styles.userAvatar}
                />
                <View style={styles.commentContainer}>
                  <Text style={styles.userComment}>{item.comment}</Text>
                  <View style={styles.userCommentDataWpar}>
                    <Text style={styles.userCommentData}>
                      {item.currentData}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
          // </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Comments..."
          />
          <TouchableOpacity
            onPress={() => addNewComment()}
            style={styles.arrow}
          >
            <FontAwesome5 name="arrow-circle-up" size={34} color="#FF6C00" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keybordContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",
  },
  flatListWrap: {
    // height: 280,
    // justifyContent: "flex-end",
  },

  userPhotoWrap: {
    // flex: 1,

    marginTop: 20,
    marginBottom: 10,
  },

  userPhoto: {
    height: 240,
    marginBottom: 10,
    borderRadius: 8,
  },

  flatListContainer: {
    // flex: 1,
  },
  commentContainer: {
    width: 300,

    marginBottom: 15,
    padding: 15,

    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },

  commentWrap: {
    flexDirection: "row-reverse",
  },

  userAvatar: {
    marginLeft: 15,
    width: 30,
    height: 30,
    borderRadius: 50,
  },

  userComment: {
    marginBottom: 10,

    fontFamily: "Roboto-Regular",
    fontSize: 13,

    color: "#212121",
  },
  userCommentDataWpar: {
    alignItems: "flex-end",
  },
  userCommentData: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,

    color: "#BDBDBD",
  },

  inputContainer: {
    height: 50,
    flexDirection: "row",
    marginBottom: 15,
    // justifyContent: "flex-end",

    alignItems: "center",
    // marginBottom: 15,

    paddingLeft: 15,
    paddingRight: 5,
    paddingHorizontal: 10,
    // marginTop: 15,

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

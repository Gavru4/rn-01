import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { firestore } from "../../firebase/config";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  getUserAvatarImage,
  getUserNickName,
  getUserEmail,
} from "../../redux/auth/authSelectors";

const PostsDefaultScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(null);

  const userAvatar = useSelector(getUserAvatarImage);
  const userNickName = useSelector(getUserNickName);
  const userEmail = useSelector(getUserEmail);

  // const getAllComments = async () => {
  //   await firestore
  //     .collection("posts")
  //     // .doc(postId)
  //     .collection("comments")
  //     .onSnapshot((data) =>
  //       setUserComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //     );
  // };

  const getAllPosts = async () => {
    await firestore
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();
    // getAllComments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfoWrap}>
        <Image style={styles.avatarWrap} source={{ uri: userAvatar }} />
        <View>
          <Text style={styles.userLogin}>{userNickName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.photoWrap}>
            <Image
              source={{ uri: item.userPhotoUrl }}
              style={styles.userPhoto}
            />
            <Text style={styles.userComment}>{item.comment}</Text>
            <View style={styles.photoDescrWrap}>
              <TouchableOpacity
                style={styles.locationInputWrap}
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: item.id,
                    uri: item.userPhotoUrl,
                    comments: item.comments,
                  })
                }
              >
                <MaterialCommunityIcons
                  name="message-reply-outline"
                  size={24}
                  color="black"
                />
                <Text style={styles.locationInput}>{item.comments.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationInputWrap}
                onPress={() => navigation.navigate("Map", item.location)}
              >
                <Feather name="map-pin" size={18} color="black" />
                <Text style={styles.locationInput}>Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  userInfoWrap: {
    marginVertical: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    height: 60,
    width: 60,
    borderRadius: 16,
    marginRight: 10,
  },
  userLogin: {
    fontFamily: "Roboto-Bold",

    fontWeight: "700",
    fontSize: 13,

    color: "#212121",

    marginBottom: 5,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },

  photoWrap: {
    marginBottom: 35,
  },

  userPhoto: {
    height: 240,
    marginBottom: 10,

    borderRadius: 8,
  },

  userComment: {
    fontFamily: "Roboto-Regular",

    fontSize: 16,

    color: "#212121",
  },

  photoDescrWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  locationInputWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  locationInput: {
    marginLeft: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
});

export default PostsDefaultScreen;

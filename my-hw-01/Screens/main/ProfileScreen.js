import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import {
  getUserId,
  getUserNickName,
  getUserAvatarImage,
} from "../../redux/auth/authSelectors";
import { increment } from "firebase/firestore";

import { firestore } from "../../firebase/config";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const userId = useSelector(getUserId);
  const userNickName = useSelector(getUserNickName);
  const userAvatar = useSelector(getUserAvatarImage);

  const [currentUserPost, setCurrentUserPost] = useState([]);
  // const [userComments, setUserComments] = useState(
  //   userComments ? userComments : 0
  // );

  const getUserPosts = async () => {
    await firestore
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setCurrentUserPost(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
  };

  const getLike = async (id) => {
    await firestore
      .collection("posts")
      .doc(id)
      .update({ like: increment(1) });
  };

  // const getNumberComments = async () => {
  //   await firestore
  //     .collection("posts")
  //     .where("userId", "==", userId)
  //     .onSnapshot((data) =>
  //       data.docs.map((doc) => setUserComments(doc.data().comments))
  //     );
  // };

  useEffect(() => {
    getUserPosts();
    // getNumberComments();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../assets/images/photoBG.jpg")}
      >
        <View style={styles.flatListWrap}>
          <Text style={styles.user}>{userNickName}</Text>
          <View style={styles.imgWrap}>
            <Image
              style={styles.avatar}
              source={{
                uri: userAvatar,
              }}
            />
          </View>
          <FlatList
            data={currentUserPost}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.photoWrap}>
                <Image
                  source={{ uri: item.userPhotoUrl }}
                  style={styles.userPhoto}
                />
                <Text style={styles.userComment}>{item.comment}</Text>
                <View style={styles.photoDescrWrap}>
                  <View style={styles.feedbackWrap}>
                    <TouchableOpacity
                      style={styles.inputWrap}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.id,
                          uri: item.userPhotoUrl,
                          postId: item.id,
                          comments: item.comments,
                        })
                      }
                    >
                      <MaterialCommunityIcons
                        name="message-reply-outline"
                        size={24}
                        color="#FF6C00"
                      />
                      <Text style={styles.commentsInput}>
                        {item.comments.length}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.inputWrap}
                      onPress={() => getLike(item.id)}
                    >
                      <EvilIcons name="like" size={28} color="#FF6C00" />
                      <Text style={styles.likesInput}>{item.like}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.inputWrap}
                    onPress={() => navigation.navigate("Map", item.location)}
                  >
                    <Feather
                      name="map-pin"
                      size={18}
                      color="black"
                      style={{ justifyContent: "flex-end" }}
                    />
                    <Text style={styles.mapInput}>
                      {item.address.city},{item.address.country}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          ></FlatList>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 140,
  },
  flatListWrap: {
    width: "100%",
    height: "100%",

    paddingHorizontal: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    backgroundColor: "#fff",
  },
  user: {
    marginTop: 92,
    marginBottom: 35,

    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 30,
    color: "#212121",
  },
  imgWrap: {
    position: "absolute",
    width: 120,
    height: 120,
    left: 128,
    top: -60,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 16,
    marginRight: 10,
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
  feedbackWrap: {
    flexDirection: "row",
    justifyContent: "center",
  },
  photoDescrWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 10,
  },
  commentsInput: {
    marginLeft: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    marginRight: 25,
  },
  likesInput: {
    marginLeft: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  mapInput: {
    marginLeft: 8,
    marginRight: 10,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
});

export default ProfileScreen;

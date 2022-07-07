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

const PostsDefaultScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [userComments, setUserComments] = useState(0);

  const getAllPosts = async () => {
    await firestore
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfoWrap}>
        <Image style={styles.avatarWrap}></Image>
        <View>
          <Text style={styles.userLogin}>Login</Text>
          <Text style={styles.userEmail}>Email</Text>
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
                  })
                }
              >
                <MaterialCommunityIcons
                  name="message-reply-outline"
                  size={24}
                  color="black"
                />
                <Text style={styles.locationInput}>{userComments}</Text>
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

// item :>>  Object {
//   "comment": "Cncjfur",
//   "id": "ojA5CVVn4CnTkG6FI9hT",
//   "location": Object {},
//   "nickName": "Test ",
//   "userId": "i40aVNOa0icXz0onFHRsj5qdbe13",
//   "userPhotoUrl": "https://firebasestorage.googleapis.com/v0/b/sociale-ec927.appspot.com/o/image%2F1657185872415?alt=media&token=1b53e8f8-5d78-4d54-8c2c-157ab244a966",
// }

const styles = StyleSheet.create({
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

    borderColor: "red",
    borderWidth: 2,
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
  container: {
    flex: 1,
    marginHorizontal: 16,
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

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button } from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";

const PostsDefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View styles={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View styles={styles.photoWrap}>
            <Image source={{ uri: item.photo }} style={styles.userPhoto} />
          </View>
        )}
      ></FlatList>
      <Button title="go to map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="go to Comments"
        onPress={() => navigation.navigate("Comments")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  photoWrap: {
    marginBottom: 10,
  },
  userPhoto: {
    flex: 1,
    width: 343,
    height: 240,
    marginBottom: 10,
    justifyContent: "center",

    borderRadius: 8,
  },
});

export default PostsDefaultScreen;

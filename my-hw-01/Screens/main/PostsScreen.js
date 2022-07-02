import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsDefaultScreen from "../nestedScreens/PostsDefaultScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperation";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        options={{
          headerTitle: "Publications",
          headerRight: () => {
            return (
              <TouchableOpacity
                style={styles.logOut}
                onPress={() => {
                  dispatch(authSignOutUser());
                }}
              >
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            );
          },
        }}
        component={PostsDefaultScreen}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

const styles = StyleSheet.create({
  logOut: {
    flex: 1,
    justifyContent: "center",
    marginRight: 20,
  },
});

export default PostsScreen;

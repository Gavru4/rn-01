import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import * as navigationBar from "expo-navigation-bar";

import PostsScreen from "../main/PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener("tabPress", (e) => {
  //       // Prevent default behavior
  //       e.preventDefault();
  //       tabBarStyle: {
  //         flex: 1,
  //         width: 70,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         color: "#FFFFFF",

  //         borderRadius: 20,
  //         backgroundColor: "#FF6C00",
  //       },
  //     });

  //     return unsubscribe;
  //   }, [navigation]);
  return (
    <MainTab.Navigator
      paddingTop="10"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { paddingTop: 10 },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused, size, color }) => {
            return (
              <TouchableOpacity
                style={
                  focused
                    ? styles.focusedBtnWrap
                    : { color: "rgba(33, 33, 33, 0.8)" }
                }
              >
                <Ionicons
                  focused={true}
                  name="grid-outline"
                  size={24}
                  style={
                    focused
                      ? { color: "#FFFFFF" }
                      : { color: "rgba(33, 33, 33, 0.8)" }
                  }
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        style={styles.container}
        options={{
          tabBarShowIcon: true,

          tabBarIcon: ({ focused, size, color }) => {
            return (
              <TouchableOpacity
                style={
                  focused
                    ? styles.focusedBtnWrap
                    : { color: "rgba(33, 33, 33, 0.8)" }
                }
              >
                <Entypo
                  name="plus"
                  size={24}
                  style={
                    focused
                      ? { color: "#FFFFFF" }
                      : { color: "rgba(33, 33, 33, 0.8)" }
                  }
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <TouchableOpacity
                style={
                  focused
                    ? styles.focusedBtnWrap
                    : { color: "rgba(33, 33, 33, 0.8)" }
                }
              >
                <Feather
                  name="user"
                  size={24}
                  style={
                    focused
                      ? { color: "#FFFFFF" }
                      : { color: "rgba(33, 33, 33, 0.8)" }
                  }
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  focusedBtnWrap: {
    flex: 1,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",

    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
});
export default HomeScreen;

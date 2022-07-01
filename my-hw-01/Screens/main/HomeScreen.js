import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import * as NavigationBar from "expo-navigation-bar";

import PostsScreen from "../main/PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

/////  icons
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import PostsDefaultScreen from "../nestedScreens/PostsDefaultScreen";

const HomeScreen = () => {
  // useEffect(()=>{const test = async () => {
  //   const visibility = await NavigationBar.getVisibilityAsync("hidden");
  // }},)
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
              <Ionicons
                name="grid-outline"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            );
          },
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        style={styles.container}
        options={{
          // headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <TouchableOpacity style={styles.addBtnWrap}>
                <Entypo name="plus" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            );
          },
        }}
      />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
            );
          },
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  addBtnWrap: {
    flex: 1,
    width: 70,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
});
export default HomeScreen;

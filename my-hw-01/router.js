import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

import PostsScreen from "./Screens/main/PostsScreen";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";

// import icons
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { View } from "react-native-web";
// import FontAwesome from "@expo/vector-icons/FontAwesome";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
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

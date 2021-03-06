import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickName: null,
    avatarImage: null,
    userEmail: null,
    stateChangeUser: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      avatarImage: payload.avatarImage,
      userEmail: payload.userEmail,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChangeUser: payload.stateChangeUser,
    }),
    authSignOut: (state) => ({
      userId: null,
      nickName: null,
      avatarImage: null,
      userEmail: null,
      stateChangeUser: false,
    }),
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

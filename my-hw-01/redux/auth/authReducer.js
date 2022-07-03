import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickname: null,
    stateChangeUser: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,

      stateChangeUser: payload.stateChangeUser,
    }),
    authSignOut: (state) => ({
      userId: null,
      nickname: null,
      stateChangeUser: false,
    }),
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

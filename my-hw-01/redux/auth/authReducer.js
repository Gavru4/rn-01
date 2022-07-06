import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickName: null,
    stateChangeUser: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChangeUser: payload.stateChangeUser,
    }),
    authSignOut: (state) => ({
      userId: null,
      nickName: null,
      stateChangeUser: false,
    }),
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

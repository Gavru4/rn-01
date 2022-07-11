import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config.js";
import { updateUserProfile, authStateChange } from "./authReducer.js";
import { onAuthStateChanged } from "firebase/auth";
import { authSignOut } from "../../redux/auth/authReducer";

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignUpUser =
  ({ login, email, password, avatarImage }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const getUser = getAuth();

      await updateProfile(getUser.currentUser, {
        displayName: login,
        photoURL: avatarImage,
      });
      dispatch(
        updateUserProfile({
          userId: user.uid,
          nickName: user.displayName,
          avatarImage,
          userEmail: email,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log(error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          updateUserProfile({
            userId: currentUser.uid,
            nickName: currentUser.displayName,
            avatarImage: currentUser.photoURL,
            userEmail: currentUser.email,
          })
        );
        dispatch(authStateChange({ stateChangeUser: true }));
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

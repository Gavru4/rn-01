import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { auth, test } from "../../firebase/config.js";
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
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const test = getAuth();
      await updateProfile(test.currentUser, {
        displayName: login,
      });
      dispatch(
        updateUserProfile({ userId: user.uid, nickName: user.displayName })
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
          })
        );
        dispatch(authStateChange({ stateChangeUser: true }));
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

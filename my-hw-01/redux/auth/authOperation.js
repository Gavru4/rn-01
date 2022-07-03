import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { auth } from "../../firebase/config.js";
import { updateUserProfile } from "./authReducer.js";
import { onAuthStateChanged } from "firebase/auth";

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

      await (user.displayName = login);

      dispatch(
        updateUserProfile({ userId: user.uid, nickname: user.displayName })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error.message);
  }
};
export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  } catch (error) {
    console.log(error.message);
  }
};

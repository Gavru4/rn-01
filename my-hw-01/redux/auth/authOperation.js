import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config.js";

export const authSignInUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log("email :>> ", email);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user :>> ", user);
    } catch (error) {
      console.log(error.message);
    }
  };
export const authSignUpUser = () => async (dispatch, getState) => {};
export const authSignOutUser = () => async (dispatch, getState) => {};

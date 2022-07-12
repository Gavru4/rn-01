import { useState } from "react";
import { useDispatch } from "react-redux";
import { firestore } from "../firebase/config";
import { userComments } from "../redux/auth/authReducer";
// const [allComments, setAllComments] = useState([]);

export const getAllComments = async (postId) => {
  const dispatch = useDispatch();

  await firestore
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .onSnapshot((data) => {
      dispatch(
        userComments(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
    });
};

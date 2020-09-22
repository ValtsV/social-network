import axios from "axios";
import { setAlert } from "./alertActions";
import actionTypes from "./types";

// Get posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("./api/posts");

    dispatch({
      type: actionTypes.GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

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

// Add like

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: { postId, likes: res.data },
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

// Remove like

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: { postId, likes: res.data },
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

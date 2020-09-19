import axios from "axios";
import { setAlert } from "./alertActions";
import actionTypes from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({ type: actionTypes.GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

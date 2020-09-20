import axios from "axios";
import { setAlert } from "./alertActions";
import actionTypes from "./types";

// get users profile

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

// Get all profiles

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: actionTypes.GET_PROFILES,
      payload: res.data,
    });
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

//  get profile by ID

export const getProfilesById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data,
    });
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

// Get github repos

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: actionTypes.GET_REPOS,
      payload: res.data,
    });
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

// Create / update profile

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({ type: actionTypes.GET_PROFILE, payload: res.data });

    dispatch(
      setAlert(edit ? "Profile updated!" : "Profile created!", "success")
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//  Add Exp

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//  Add Edu

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//  Delete Exp

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience removed", "success"));
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

//  Delete Education

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education removed", "success"));
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

// Delete acc n profile

export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      const res = await axios.delete("/api/profile/");

      dispatch({
        type: actionTypes.CLEAR_PROFILE,
      });

      dispatch({
        type: actionTypes.ACCOUNT_DELETED,
      });

      dispatch(
        setAlert("Your account has been permanently deleted", "success")
      );
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};

import actionTypes from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_PROFILE:
    case actionTypes.UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false };

    case actionTypes.PROFILE_ERROR:
      return { ...state, error: payload, loading: false, profile: null };
    case actionTypes.CLEAR_PROFILE:
      return { ...state, profile: null, repos: [] };
    case actionTypes.GET_PROFILES:
      return { ...state, profiles: payload, loading: false };
    case actionTypes.GET_REPOS:
      return { ...state, repos: payload, loading: false };
    default:
      return state;
  }
}

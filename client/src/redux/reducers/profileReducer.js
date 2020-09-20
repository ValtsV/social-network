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
      return { ...state, error: payload, loading: false };
    case actionTypes.CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };

    default:
      return state;
  }
}

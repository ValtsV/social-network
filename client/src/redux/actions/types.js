const actionTypes = {
  // alerts
  SET_ALERT: "SET_ALERT",
  REMOVE_ALERT: "REMOVE_ALERT",
  // auth
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  USER_LOADED: "USER_LOADED",
  AUTH_ERROR: "AUTH_ERROR",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",
  // profile
  GET_PROFILE: "GET_PROFILE",
  GET_PROFILES: "GET_PROFILES",
  PROFILE_ERROR: "PROFILE_ERROR",
  CLEAR_PROFILE: "CLEAR_PROFILE",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  // account
  ACCOUNT_DELETED: "ACCOUNT_DELETED",
  // repos
  GET_REPOS: "GET_REPOS",
};

export default actionTypes;

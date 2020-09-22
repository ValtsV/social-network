import actionTypes from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case actionTypes.POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actionTypes.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
      };

    default:
      return state;
  }
}

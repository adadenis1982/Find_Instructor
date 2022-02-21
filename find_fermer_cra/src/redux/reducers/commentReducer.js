import * as types from '../actionTypes/comments';

// eslint-disable-next-line default-param-last
export function commentReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case types.INIT_COMMENT:
    case types.CREATE_COMMENT:
    case types.DELETE_COMMENT: {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    }

    case types.CREATE_COMMENT_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = [...newState.data, payload.data];
      return newState;
    }

    case types.INIT_COMMENT_ERROR:
    case types.CREATE_COMMENT_ERROR:
    case types.DELETE_COMMENT_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    case types.DELETE_COMMENT_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = newState.data.filter(
        (comment) => comment.id !== payload.id,
      );
      return newState;
    }

    case types.INIT_COMMENT_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = payload.data;
      return newState;
    }

    default: {
      return state;
    }
  }
}

import * as types from '../actionTypes/huyusser';

// eslint-disable-next-line default-param-last
export function huyusser(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case types.INIT_CHAT_TOKEN: {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    }

    case types.INIT_CHAT_TOKEN_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    case types.INIT_CHAT_TOKEN_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = payload.data;
      return newState;
    }

    case types.CHAT_TOKEN_DELETE: {
      const newState = {};
      newState.loading = false;
      newState.error = null;
      return newState;
    }

    default: {
      return state;
    }
  }
}

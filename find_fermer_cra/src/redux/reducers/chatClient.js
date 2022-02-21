import * as types from '../actionTypes/huyusser';

// eslint-disable-next-line default-param-last
export function chatClient(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case types.INIT_CHAT_CLIENT: {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    }

    case types.INIT_CHAT_CLIENT_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    case types.INIT_CHAT_CLIENT_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = payload.data;
      return newState;
    }

    case types.CHAT_CLIENT_DELETE: {
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

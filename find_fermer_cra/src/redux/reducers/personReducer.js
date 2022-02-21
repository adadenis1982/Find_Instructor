import * as types from '../actionTypes/person';

// eslint-disable-next-line default-param-last
export function personReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case types.UPDATE_USER:
    case types.INIT_INFO: {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    }

    case types.UPDATE_USER_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = [...newState.data, payload.data];
      return newState;
    }

    case types.UPDATE_USER_ERROR:
    case types.INIT_INFO_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    case types.INIT_INFO_SUCCESS: {
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

import * as types from '../actionTypes/advert';

// eslint-disable-next-line default-param-last
export function advertReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case types.INIT_ADVERT:
    case types.CREATE_ADVERT:
    case types.DELETE_ADVERT: {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    }

    case types.CREATE_ADVERT_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = [...newState.data, payload];
      return newState;
    }

    case types.INIT_ADVERT_ERROR:
    case types.CREATE_ADVERT_ERROR:
    case types.DELETE_ADVERT_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    case types.DELETE_ADVERT_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = newState.data.filter(
        (advert) => advert.id !== payload.id,
      );
      return newState;
    }

    case types.INIT_ADVERT_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}

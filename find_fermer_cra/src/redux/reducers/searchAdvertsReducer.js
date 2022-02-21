import {
  SEARCH_ADVERTS,
  SEARCH_ADVERTS_SUCCESS,
  SEARCH_ADVERTS_ERROR,
  SEARCH_MORE_ADVERTS,
  SEARCH_MORE_ADVERTS_ERROR, SEARCH_MORE_ADVERTS_SUCCESS
} from "../actionTypes/advert";

const initialState = {
  loading: false,
  error: null,
  page: 0,
  totalLength: 0,
  adverts: [],
};

export function searchAdvertsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_ADVERTS:
    case SEARCH_MORE_ADVERTS: {
      const newState = { ...state };
      newState.loading = true;
      return newState;
    }
    case SEARCH_ADVERTS_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.page += 1;
      newState.totalLength = payload.totalLength;
      newState.adverts = payload.data;
      return newState;
    }
    case SEARCH_MORE_ADVERTS_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.page += 1;
      newState.totalLength = payload.totalLength;
      newState.adverts = { ...newState.adverts, ...payload.data };
      return newState;
    }

    case SEARCH_ADVERTS_ERROR:
    case SEARCH_MORE_ADVERTS_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    default:
      return state;
  }
}

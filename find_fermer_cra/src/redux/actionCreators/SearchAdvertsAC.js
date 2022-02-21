import axios from 'axios';

import { env } from '../../secret';

import {
  SEARCH_ADVERTS,
  SEARCH_ADVERTS_SUCCESS,
  SEARCH_ADVERTS_ERROR,
} from '../actionTypes/advert';

export const searchAdvertsStart = () => ({
  type: SEARCH_ADVERTS,
});

export const searchAdvertsSuccess = (payload) => ({
  type: SEARCH_ADVERTS_SUCCESS,
  payload,
});

export const searchAdvertsError = (payload) => ({
  type: SEARCH_ADVERTS_ERROR,
  payload,
  error: true,
});

// thunk
export const searchAdverts = (payload) => async (dispatch) => {
  dispatch(searchAdvertsStart());
  const { search } = payload;
  try {
    const response = await axios.get(
      `${env.REACT_APP_URL}/search/result${search}`,
      { withCredentials: true },
    );

    console.log('response', response);
    dispatch(
      searchAdvertsSuccess({
        data: response.data.adverts,
        totalLength: response.data.totalLength,
      }),
    );
  } catch (error) {
    dispatch(searchAdvertsError(error));
  }
};

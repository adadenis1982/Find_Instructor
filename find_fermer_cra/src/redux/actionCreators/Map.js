import * as types from '../actionTypes/map';
import { env } from '../../secret';

const initMapLoading = () => ({
  type: types.INIT_MAP_LOADING,
});
const initMapSuccess = (payload) => ({
  type: types.INIT_MAP_SUCCESS,
  payload,
});
const initMapError = (payload) => ({
  type: types.INIT_MAP_ERROR,
  payload,
  error: true,
});

export const fetchMap = () => async (dispatch) => {
  dispatch(initMapLoading());
  try {
    const response = await fetch(`${env.REACT_APP_URL}/map`, {
      credentials: 'include',
    });
    const data = await response.json();

    dispatch(initMapSuccess({ data }));
  } catch (error) {
    dispatch(initMapError(error));
  }
};

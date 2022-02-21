import axios from 'axios';
import * as types from '../actionTypes/person';
import { env } from '../../secret';

// create
export const updateUserStart = () => ({
  type: types.UPDATE_USER,
});

export const updateUserSuccess = (payload) => ({
  type: types.UPDATE_USER_SUCCESS,
  payload,
});

export const updateUserError = (payload) => ({
  type: types.UPDATE_USER_ERROR,
  payload,
  error: true,
});

// thunk
export const updateUser = (newImg, payload) => async (dispatch) => {
  dispatch(updateUserStart());
  let response;
  try {
    response = await axios.all([
      axios.put(`${env.REACT_APP_URL}/users/${payload.user_id}`, payload),
      axios.put(`${env.REACT_APP_URL}/users/${payload.user_id}`, newImg),
    ]);
    dispatch(updateUserSuccess({ data: response.data }));
  } catch (er) {
    dispatch(updateUserError(er));
  }
  return response;
};

// init
export const initInfoStart = () => ({
  type: types.INIT_INFO,
});

export const initInfoSuccess = (payload) => ({
  type: types.INIT_INFO_SUCCESS,
  payload,
});

export const initInfoError = (payload) => ({
  type: types.INIT_INFO_ERROR,
  payload,
  error: true,
});

// thunk
export const initInfo = (payload) => async (dispatch) => {
  dispatch(initInfoStart());
  let response;
  try {
    response = await axios.get(
      `${env.REACT_APP_URL}/users/${payload.user_id}`,
      payload,
    );
    console.log(response.data);
    dispatch(initInfoSuccess({ data: response.data }));
  } catch (er) {
    dispatch(initInfoError(er));
  }
  return response;
};

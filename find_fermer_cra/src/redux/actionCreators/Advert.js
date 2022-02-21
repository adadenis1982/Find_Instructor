// здесь создаём экшены
import axios from 'axios';
import * as types from '../actionTypes/advert';
import { env } from '../../secret';

// create
export const addAdvertStart = () => ({
  type: types.CREATE_ADVERT,
});

export const addAdvertSuccess = (payload) => ({
  type: types.CREATE_ADVERT_SUCCESS,
  payload,
});

export const addAdvertError = (payload) => ({
  type: types.CREATE_ADVERT_ERROR,
  payload,
  error: true,
});

// thunk
export const addAdvert = (payload) => async (dispatch) => {
  dispatch(addAdvertStart());
  let response;
  try {
    response = await axios.post(`${env.REACT_APP_URL}/adverts`, payload);
    console.log(response.data);
    dispatch(addAdvertSuccess({ data: response.data }));
  } catch (er) {
    dispatch(addAdvertError(er));
  }
  return response;
};

export const deleteAdvertStart = () => ({
  type: types.CREATE_ADVERT,
});

export const deleteAdvertSuccess = (payload) => ({
  type: types.CREATE_ADVERT_SUCCESS,
  payload,
});

export const deleteAdvertError = (payload) => ({
  type: types.CREATE_ADVERT_ERROR,
  payload,
  error: true,
});

export const deleteAdvert = (advertId) => async (dispatch) => {
  dispatch(deleteAdvertStart());
  try {
    const { data } = await axios.delete(
      `${env.REACT_APP_URL}/adverts/${advertId}`,
    );
    dispatch(deleteAdvertSuccess(data));
  } catch (e) {
    dispatch(deleteAdvertError(e));
  }
};

export const initAdvertStart = () => ({
  type: types.INIT_ADVERT,
});

export const initAdvertSuccess = (payload) => ({
  type: types.INIT_ADVERT_SUCCESS,
  payload,
});

export const initAdvertError = (payload) => ({
  type: types.INIT_ADVERT_ERROR,
  payload,
  error: true,
});

export const initAdvert = (params) => (dispatch) => {
  dispatch(initAdvertStart());
  axios
    .get(`${env.REACT_APP_URL}/adverts?${params}`)
    .then((res) => dispatch(initAdvertSuccess({ data: res.data })))
    .catch((err) => dispatch(initAdvertError(err)));
  // dispatch(actions.getPosts());
};

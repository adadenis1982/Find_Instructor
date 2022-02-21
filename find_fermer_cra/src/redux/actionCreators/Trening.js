// здесь создаём экшены
import axios from 'axios';
import * as types from '../actionTypes/Trening';
import { env } from '../../secret';

// create
export const addTreningStart = () => ({
  type: types.CREATE_TRENING,
});

export const addTreningSuccess = (payload) => ({
  type: types.CREATE_TRENING_SUCCESS,
  payload,
});

export const addTreningError = (payload) => ({
  type: types.CREATE_TRENING_ERROR,
  payload,
  error: true,
});

// thunk
export const addTrening = (payload) => async (dispatch) => {
  dispatch(addTreningStart());
  try {
    const response = await axios.post(`${env.REACT_APP_URL}/adverts`, payload, {
      withCredentials: true,
    });
    console.log(response.data);
    dispatch(addTreningSuccess({ data: response.data }));
  } catch (er) {
    dispatch(addTreningError(er));
  }
};

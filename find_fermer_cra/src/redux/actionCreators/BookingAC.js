import axios from 'axios';

import { env } from '../../secret';
import * as types from '../actionTypes/booking';
import {
  INIT_BOOKINGS,
  INIT_BOOKINGS_ERROR,
  INIT_BOOKINGS_SUCCESS,
} from '../actionTypes/booking';

export const createBookingStart = () => ({
  type: types.CREATE_BOOKING,
});

export const createBookingSuccess = (payload) => ({
  type: types.CREATE_BOOKING_SUCCESS,
  payload,
});

export const createBookingError = (payload) => ({
  type: types.CREATE_BOOKING_ERROR,
  payload,
  error: true,
});

// thunk
export const createBooking = (payload) => async (dispatch) => {
  console.log('payload', payload);
  dispatch(createBookingStart());
  try {
    console.log('Start axios');
    const response = await axios.post(
      `${env.REACT_APP_URL}/bookings`,
      payload,
      {
        withCredentials: true,
      },
    );

    console.log('response', response);
    dispatch(
      createBookingSuccess({
        data: response.data.booking,
      }),
    );
  } catch (error) {
    dispatch(createBookingError(error));
  }
};

// init

export const initBookingsStart = () => ({
  type: types.INIT_BOOKINGS,
});

export const initBookingsSuccess = (payload) => ({
  type: types.INIT_BOOKINGS_SUCCESS,
  payload,
});

export const initBookingsError = (payload) => ({
  type: types.INIT_BOOKINGS_ERROR,
  payload,
  error: true,
});

export const initBookings = (params) => (dispatch) => {
  dispatch(initBookingsStart());
  axios
    .get(`${env.REACT_APP_URL}/bookings/${params.id}`)
    .then((res) => dispatch(initBookingsSuccess({ data: res.data })))
    .catch((err) => dispatch(initBookingsError(err)));
};

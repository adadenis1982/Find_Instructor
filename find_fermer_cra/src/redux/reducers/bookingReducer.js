import * as types from '../actionTypes/booking';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export function bookingReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_BOOKING:
    case types.INIT_BOOKINGS: {
      const newState = { ...state };
      newState.loading = true;
      return newState;
    }
    case types.CREATE_BOOKING_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.data = [...newState.data, { ...payload.data }];
      return newState;
    }

    case types.CREATE_BOOKING_ERROR:
    case types.INIT_BOOKINGS_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }

    case types.INIT_BOOKINGS_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = payload;
      return newState;
    }

    default:
      return state;
  }
}

import { CHECK_SESSION } from '../actionTypes/isAuthorizedAT';
import { env } from '../../secret';

export const checkSession = (payload) => ({ type: CHECK_SESSION, payload });

export const fetchCheckSession = () => (dispatch) => {
  fetch(`${env.REACT_APP_URL}/isAuthorized`, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.isAuthorized) {
        dispatch(checkSession({ status: data.isAuthorized, user: data }));
      } else {
        dispatch(checkSession({ status: data.isAuthorized, user: [] }));
      }
    })
    .catch((err) => console.log(err.message));
};

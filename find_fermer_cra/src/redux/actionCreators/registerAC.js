import { checkSession } from './isAuthorizedAC';
import { env } from '../../secret';

export const fetchRegister = (payload) => async (dispatch) => {
  const response = await fetch(`${env.REACT_APP_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (data.registration) {
    return dispatch(checkSession({ status: data.registration, user: data }));
  }
  return data;
};

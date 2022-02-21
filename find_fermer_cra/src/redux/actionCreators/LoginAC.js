import { checkSession } from './isAuthorizedAC';
import { env } from '../../secret';

export const fetchLogin = (payload) => async (dispatch) => {
  const response = await fetch(`${env.REACT_APP_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (data.login) {
    return dispatch(checkSession({ status: data.login, user: data }));
  }
  return data;
};

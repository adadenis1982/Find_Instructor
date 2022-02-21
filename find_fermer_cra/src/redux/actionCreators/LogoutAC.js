import { checkSession } from './isAuthorizedAC';
import { env } from '../../secret';

export const fetchLogout = (navigate) => async (dispatch) => {
  const responce = await fetch(`${env.REACT_APP_URL}/logout`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await responce.json();

  if (data.logout) {
    navigate('/', { replace: true });
    return dispatch(checkSession({ status: !data.logout, user: [] }));
  }
};

import axios from 'axios';
import * as types from '../actionTypes/huyusser';
import { env } from '../../secret';

export const initChatTokenStart = () => ({
  type: types.INIT_CHAT_TOKEN,
});

export const initChatTokenSuccess = (payload) => ({
  type: types.INIT_CHAT_TOKEN_SUCCESS,
  payload,
});

export const initChatTokenError = (payload) => ({
  type: types.INIT_CHAT_TOKEN_ERROR,
  payload,
  error: true,
});

export const deleteChatToken = () => ({
  type: types.CHAT_TOKEN_DELETE,
});

export const initChatToken = (params) => (dispatch) => {
  dispatch(initChatTokenStart());
  axios
    .get(`${env.REACT_APP_URL}/chat/token`, {
      withCredentials: true,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
    .then((res) => dispatch(initChatTokenSuccess({ data: res.data })))
    .catch((err) => dispatch(initChatTokenError(err)));
};

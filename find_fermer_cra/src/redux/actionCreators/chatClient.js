import { StreamChat } from 'stream-chat';
import * as types from '../actionTypes/huyusser';

export const initChatClientStart = () => ({
  type: types.INIT_CHAT_CLIENT,
});

export const initChatClientSuccess = (payload) => ({
  type: types.INIT_CHAT_CLIENT_SUCCESS,
  payload,
});

export const initChatClientError = (payload) => ({
  type: types.INIT_CHAT_CLIENT_ERROR,
  payload,
  error: true,
});

export const deleteChatClient = () => ({
  type: types.CHAT_CLIENT_DELETE,
});

export const initChatClient =
  ({ session, userToken }) =>
  async (dispatch) => {
    dispatch(initChatClientStart());
    try {
      const client = StreamChat.getInstance('c4k6c4gtm8db');
      await client.connectUser(
        {
          id: session.user.user.id,
          name: session.user.user.username,
          image: session.user.user.photo,
        },
        userToken,
      );
      dispatch(initChatClientSuccess({ data: client }));
    } catch (e) {
      dispatch(initChatClientError(e));
    }
  };

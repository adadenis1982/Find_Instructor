import axios from 'axios';
import * as types from '../actionTypes/comments';

export const initComment = () => ({
  type: types.INIT_COMMENT,
});

export const initCommentSuccess = (payload) => ({
  type: types.INIT_COMMENT_SUCCESS,
  payload,
});

export const initCommentError = (payload) => ({
  type: types.INIT_COMMENT_ERROR,
  payload,
  error: true,
});

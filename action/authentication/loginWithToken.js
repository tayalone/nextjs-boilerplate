import {
  LOGIN_WITH_TOKEN_INIT,
  LOGIN_WITH_TOKEN_SUCCESS,
  LOGIN_WITH_TOKEN_FAILED
} from '../actionTypes';
import axios from 'axios';
import Router from 'next/router';

export default (token, closeModal) => {
  return async dispatch => {
    try {
      console.log(token);
      const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/users/loginWithToken',
        data: { token }
      });
      const data = res.data.data;
      console.log(data);
      dispatch(success(data));
      closeModal();
      setTimeout(function() {
        Router.push({
          pathname: '/like'
        });
      }, 3000);
    } catch (e) {
      const { message } = e.response.data;
      dispatch(falied(message));
      console.log(message);
    }
  };
};

const init = () => {
  return { type: LOGIN_WITH_TOKEN_INIT };
};

const success = data => {
  return { type: LOGIN_WITH_TOKEN_SUCCESS, data };
};

const falied = errorMessage => {
  return { type: LOGIN_WITH_TOKEN_FAILED, errorMessage };
};

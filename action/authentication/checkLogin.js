import {
  CHECK_LOGIN_INIT,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILED
} from '../actionTypes';
import axios from 'axios';
import Router from 'next/router';
export default () => {
  return async (dispatch, getState) => {
    try {
      const accessToken = localStorage.getItem('popone_accessToken');
      const { isLogin } = getState().authentication;
      dispatch(init());
      console.log(accessToken, isLogin);
      if (accessToken && isLogin) {
        console.log('log in แล้ว');
      } else if (accessToken && !isLogin) {
        console.log('check loopback token');
      } else {
        Router.push({
          pathname: '/'
        });
      }
      dispatch(init());
    } catch (e) {
      const { message } = e.response.data;
      //dispatch(falied(message));
      console.log(message);
    }
  };
};

const init = () => {
  return {
    type: CHECK_LOGIN_INIT
  };
};

const success = () => {
  return {
    type: CHECK_LOGIN_SUCCESS
  };
};

const filed = () => {
  return {
    type: CHECK_LOGIN_FAILED
  };
};

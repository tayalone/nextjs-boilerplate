import {
  LOGIN_WITH_TOKEN_INIT,
  LOGIN_WITH_TOKEN_SUCCESS,
  LOGIN_WITH_TOKEN_FAILED
} from '../../action/actionTypes';

const initState = {
  isLoading: false,
  isLogin: false,
  errorMessage: '',
  accessToken: '',
  fb_accessToken: '',
  countryCode: '',
  locale: '',
  config: {}
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_WITH_TOKEN_INIT: {
      return { ...state, isLoading: true };
    }
    case LOGIN_WITH_TOKEN_SUCCESS: {
      const {
        accessToken,
        config,
        countryCode,
        fb_accessToken,
        locale
      } = action.data;
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        accessToken,
        config,
        countryCode,
        fb_accessToken,
        locale
      };
    }
    case LOGIN_WITH_TOKEN_FAILED: {
      const errorMessage = action.errorMessage;
      return { ...state, isLoading: false, errorMessage };
    }
    default:
      return state;
  }
};

export default reducer;

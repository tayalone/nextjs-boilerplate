import { ADD_NUMBER, SUB_NUMBER } from '../../action/actionTypes';

const initState = {
  value: 0
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_NUMBER: {
      const newValue = state.value + 1;
      return { ...state, value: newValue };
    }
    case SUB_NUMBER: {
      const newValue = state.value - 1;
      return { ...state, value: newValue };
    }
    default:
      return state;
  }
};

export default reducer;

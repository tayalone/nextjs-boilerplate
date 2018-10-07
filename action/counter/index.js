import { ADD_NUMBER, SUB_NUMBER } from '../actionTypes';

export const addNumber = () => {
  return {
    type: ADD_NUMBER
  };
};

export const subNumber = () => {
  return {
    type: SUB_NUMBER
  };
};

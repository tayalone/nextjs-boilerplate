import { combineReducers } from 'redux';
import counter from './counter';
const RootReducer = combineReducers({
  counter
});

export default RootReducer;

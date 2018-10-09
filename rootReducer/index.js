import { combineReducers } from 'redux';
import authentication from './authentication';
import counter from './counter';
const RootReducer = combineReducers({
  authentication,
  counter
});

export default RootReducer;

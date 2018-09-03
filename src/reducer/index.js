import { combineReducers } from 'redux';
import MineSocketDbDataUpdateReducer from './MineSocketDbDataUpdateReducer'


export default combineReducers({
  mineSocketListForUpdate: MineSocketDbDataUpdateReducer,
});

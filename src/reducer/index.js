import { combineReducers } from 'redux';
import MineSocketDbDataLoadReducer from './MineSocketDbDataLoadReducer';
import ReplaceSelectionReducer from './ReplaceSelectionReducer';

export default combineReducers({
  mineSocketData: MineSocketDbDataLoadReducer,
  selectedForReplace: ReplaceSelectionReducer
});

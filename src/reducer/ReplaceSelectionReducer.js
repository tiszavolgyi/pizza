import { CHANGE_MOVE_UI } from '../reduxActions/MineSocketLoadAction'

export default (state = { socketKey: null }, action) => {
  switch (action.type) {
    case CHANGE_MOVE_UI:
      return {
        socketKey: action.socketKey
      }
    default:
      return state;
  }
}

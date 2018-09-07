import {
  LOAD_MINESOCKET_DATA,
  RECEIVE_LOADED_MINESOCKET_DATA,
  CHANGE_MOVE_UI } from '../reduxActions/MineSocketLoadAction';

const initState = () => {
  let state = [];
  for (let i = 0; i < 12; i++) {
    state.push({
      id: i,
      isLoading: false,
      isMoveUI: false,
      data: {}
    });
  }
  return state;
};

const initialState = initState();

export default (state = initialState, action) => {

  switch (action.type) {
    case LOAD_MINESOCKET_DATA :
      state[action.socketKey].isLoading = true;
      return [...state];

    case RECEIVE_LOADED_MINESOCKET_DATA :
      return state.map((value, index) => {
        if (index === action.socketKey) {
          return Object.assign({}, value, {
            isLoading: false,
            data: Object.assign({}, action.data, {
              isEmpty: (action.data.isEmpty  === 'true')
            })
          })
        }
        return value;
      });

    case CHANGE_MOVE_UI:
      return state.map((value, index) => {
        return Object.assign({}, value, {
          isMoveUI: action.value
        });
      });

    default:
      return state;
  }
}




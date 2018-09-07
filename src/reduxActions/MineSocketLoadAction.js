import PizzaTimerModel from '../storage/PizzaTimerModel'

export const LOAD_MINESOCKET_DATA = "LOAD_MINESOCKET_DATA";
const requestData = socketKey => {
  return {
    type: LOAD_MINESOCKET_DATA,
    socketKey: socketKey
  };
}

export const RECEIVE_LOADED_MINESOCKET_DATA = "RECEIVE_LOADED_MINESOCKET_DATA";
const receiveData = (socketKey, socketData) => {
  return {
    type: RECEIVE_LOADED_MINESOCKET_DATA,
    socketKey: socketKey,
    data: socketData
  };
}

export const loadSocketData = ( socketKey ) => {

  return dispatch => {
    dispatch(requestData(socketKey));

    const pizzaTimerModel = new PizzaTimerModel();

    return pizzaTimerModel.getTimerData(socketKey)
      .then(resp => {
        const socketData = resp[`socket_${socketKey}`];
        dispatch(receiveData(socketKey, socketData));
      }).catch(error => {
        console.log(error);
      })
  }
};


export const CHANGE_MOVE_UI = "CHANGE_MOVE_UI";
export const changeMoveUI = (val, socketKey) => {
  return {
    type: CHANGE_MOVE_UI,
    value: val,
    socketKey: socketKey
  }
}

export const REQUEST_TO_REPLACE = "REQUEST_TO_REPLACE";
export const requestToReplace = ( socketKey ) => {
  return {
    type: REQUEST_TO_REPLACE,
    socketKey: socketKey
  }
}

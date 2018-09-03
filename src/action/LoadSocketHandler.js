import PizzaTimerModel from '../storage/PizzaTimerModel'

class LoadSocketHandler {

  constructor () {
    this.pizzaTimerModel = new PizzaTimerModel();
  }

  loadSocketData(socketKey, callbackFunction) {
    const queryArray = [
      `${this.pizzaTimerModel.dbName}:socket_${ socketKey }:isEmpty`,
      `${this.pizzaTimerModel.dbName}:socket_${ socketKey }:pizza`,
      `${this.pizzaTimerModel.dbName}:socket_${ socketKey }:pizzaId`,
      `${this.pizzaTimerModel.dbName}:socket_${ socketKey }:size`,
      `${this.pizzaTimerModel.dbName}:socket_${ socketKey }:start`,
      `${this.pizzaTimerModel.dbName}:socket_${ socketKey }:finish`
    ];

    this.pizzaTimerModel.getMultipleItemsInObject(queryArray)
      .then(value => {
        callbackFunction(value[`socket_${socketKey}`]);
      })
      .catch(e => console.log(e));
  }
}

export default

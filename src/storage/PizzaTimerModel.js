import AbstractModel from './AbstractModel';

class PizzaTimerModel extends AbstractModel {

  constructor () {
    super();
    this.dbName = '@PizzaTimer';
  }

  async getTimerData(socketId) {
    const dbFrontKey = `${this.dbName}:socket_${socketId}`;

    const queryData = [
      `${dbFrontKey}:start`,
      `${dbFrontKey}:finish`,
      `${dbFrontKey}:pizza`,
      `${dbFrontKey}:pizzaId`,
      `${dbFrontKey}:size`,
      `${dbFrontKey}:isEmpty`
    ];

    return await this.getMultipleItemsInObject(queryData);
  }

  async getEmptySockets() {
    let emptySockets = [];

    for (let i=0; i < 12; i++) {
      const item = await this.getItem(`socket_${i}:isEmpty`);
      if (item === "true"){
        emptySockets.push(i);
      }
    }

    return emptySockets;
  }

  async setSocketToEmpty(socketId) {
    const dbFrontKey = `${this.dbName}:socket_${socketId}`;

    const queryData = [
      `${dbFrontKey}:start`,
      `${dbFrontKey}:finish`,
      `${dbFrontKey}:pizza`,
      `${dbFrontKey}:pizzaId`,
      `${dbFrontKey}:size`,
    ];

    await this.setItem(`socket_${socketId}:isEmpty`, 'true');
    await this.removeMultipleItems(queryData);
  }
}

export default PizzaTimerModel;

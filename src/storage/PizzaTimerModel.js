import AbstractModel from './AbstractModel';

class PizzaTimerModel extends AbstractModel {

  constructor () {
    super();
    this.dbName = '@PizzaTimer';
  }

  getTimerData(socketId) {
    const dbFrontKey = `${this.dbName}:socket_${socketId}`;

    const queryData = [
      `${dbFrontKey}:start`,
      `${dbFrontKey}:finish`,
      `${dbFrontKey}:pizza`,
      `${dbFrontKey}:size`,
      `${dbFrontKey}:isEmpty`
    ];

    return this.getMultipleItemsInObject(queryData);
  }

  async setSocketToEmpty(socketId) {
    const dbFrontKey = `${this.dbName}:socket_${socketId}`;

    const queryData = [
      `${dbFrontKey}:start`,
      `${dbFrontKey}:finish`,
      `${dbFrontKey}:pizza`,
      `${dbFrontKey}:size`,
    ];

    await this.setItem(`socket_${socketId}:isEmpty`, 'true');
    await this.removeMultipleItems(queryData);
  }
}

export default PizzaTimerModel;
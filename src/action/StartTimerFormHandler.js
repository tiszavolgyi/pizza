import moment from 'moment';

import PizzaList from '../config/PizzaList';
import SizeList from '../config/SizeList';
import PizzaTimerModel from '../storage/PizzaTimerModel';

class StartTimerFormHandler {

  constructor (pizzaId, sizeId) {
    this.pizzaId = pizzaId;
    this.sizeId = sizeId;
    this.pizzaTimerModel = new PizzaTimerModel();
  }

  async addDataToStorage(socketId) {
    await this.pizzaTimerModel.setMultipleItems(this.getDbData(socketId));
  }

  getDbData(socketId) {
    const dbFrontKey = `${this.pizzaTimerModel.dbName}:socket_${socketId}`;

    return [
      [
        `${dbFrontKey}:start`,
        moment().format('x').toString()
      ],
      [
        `${dbFrontKey}:finish`,
        moment().add(this.cookingTime, 'ms').format('x').toString()
      ],
      [
        `${dbFrontKey}:pizza`,
        this.pizzaName
      ],
      [
        `${dbFrontKey}:pizzaId`,
        `${this.pizzaId}`
      ],
      [
        `${dbFrontKey}:size`,
        this.sizeShortName
      ],
      [
        `${dbFrontKey}:isEmpty`,
        "false"
      ]
    ];
  }

  get sizeShortName() {
    return SizeList[this.sizeId]['shortName'];
  }

  get pizzaName() {
    return PizzaList[this.pizzaId]['name'];
  }

  get cookingTime() {
    return PizzaList[this.pizzaId]['size'][this.sizeShortName];
  }

}

export default StartTimerFormHandler;
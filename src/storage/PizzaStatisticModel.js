import AbstractModel from './AbstractModel';
import moment from 'moment';

class PizzaStatisticModel extends AbstractModel {

  constructor () {
    super();
    this.dbName = '@PizzaStatistics';
  }

  async addNewStat(socketData) {
    const nowDate = moment().format('YYYYMMDD').toString();
    let pizzaList = await this.getItem(`${nowDate}:pizzaList`);

    if (pizzaList !== null) {
      pizzaList = JSON.parse(pizzaList);

      if(`${socketData.pizzaId}` in pizzaList) {
        pizzaList[`${socketData.pizzaId}`]++;
      } else {
        pizzaList[`${socketData.pizzaId}`] = 1;
      }

    } else {
      pizzaList = {};
      pizzaList[`${socketData.pizzaId}`] = 1;
    }
    await this.setItem(`${nowDate}:pizzaList`, JSON.stringify(pizzaList));
  }

  async getPizzaStatListByDate(date) {
    return JSON.parse(await this.getItem(`${date}:pizzaList`));
  }

}

export default PizzaStatisticModel;
import AbstractModel from './AbstractModel';

class PizzaStatisticModel extends AbstractModel {

  constructor () {
    super();
    this.dbName = '@PizzaStatistics';
  }

}

export default PizzaStatisticModel;
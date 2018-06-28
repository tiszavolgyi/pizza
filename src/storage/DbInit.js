import { AsyncStorage } from 'react-native';

class DbInit {
  static async initPizzaTimer() {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.multiSet(DbInit.getPizzaTimerMultisetData())
    } catch (e) {
      console.log(e);
    }
  }

  static getPizzaTimerMultisetData() {
    let defaultDbValues = [];
    for (let key = 0; key < 12; key++) {
      defaultDbValues[key] = [`@PizzaTimer:socket_${key}:isEmpty`, 'true'];
    }

    return defaultDbValues;
  }

  static async initStatistics() {

  }
}

const dbAchitecture = {
  "20180625": {
    "readableDate": "2018.06.25.",
    "pizzaList": {
      5: 34,
      8: 12,
      0: 62
    }
  },
  "20180626": {
    readableDate: "2018.06.25",
    "pizzaList": {
      0:1,
      8:20,
      5:12,
      3:6
    }
  }
}

export default DbInit;
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
}

export default DbInit;
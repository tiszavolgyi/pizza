import { AsyncStorage } from 'react-native';
import DeepMerge from '../action/DeepMerge';


class AbstractModel {

  //All AsyncStorage functions returns a Promise object

  createQueryKey(key) {
    return `${this.dbName}:${key}`;
  }

  async getItem (key) {
    return await AsyncStorage.getItem(this.createQueryKey(key));
  }

  async getMultipleItems (itemsArray) {
    return await AsyncStorage.multiGet(itemsArray);
  }

  async getMultipleItemsInObject (itemsArray) {
    const data = await this.getMultipleItems(itemsArray);
    let returnObject = {};

    data.forEach((keyValuePairArray) => {
      const splittedKey = keyValuePairArray[0].split(":");
      let tmpObj = {};
      splittedKey.shift();
      splittedKey.reverse();

      splittedKey.forEach((value) => {
        if (Object.keys(tmpObj).length === 0 && tmpObj.constructor === Object) {
          tmpObj[value] = keyValuePairArray[1]
        } else {
          let tmpObj2 = tmpObj;
          tmpObj = {};
          tmpObj[value] = tmpObj2;
        }
      });

      returnObject = DeepMerge.merge(tmpObj, returnObject);
    });

    return returnObject;
  }

  async setItem (key, value) {
    return await AsyncStorage.setItem(this.createQueryKey(key), value);
  }

  async setMultipleItems (itemsArray) {
    return await AsyncStorage.multiSet(itemsArray);
  }

  async removeItem(key) {
    return await AsyncStorage.removeItem(this.createQueryKey(key));
  }

  async removeMultipleItems(itemsArray) {
    return await AsyncStorage.multiRemove(itemsArray);
  }
}

export default AbstractModel;

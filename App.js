import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { Font, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Pages from './src/enum/Pages';
import DbInit from './src/storage/DbInit';
import PizzaTimerModel from './src/storage/PizzaTimerModel';
import MinePageContent from './src/components/MinePageContent';
import StartTimerPageContent from './src/components/StartTimerPageContent';

import reducers from './src/reducer';

class App extends Component {

  constructor (props) {
    super(props);
    this.setActivePage = this.setActivePage.bind(this);
  }
  store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
  );

  state = {
    isReady: false,
    activePage : {
      name: Pages.MINE_PAGE,
      values: {}
    }
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={App._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    const { container } = styles;
    const activePageObj = this.getActivePage();
    const ActivePage = activePageObj.component;

    return (
      <Provider store={this.store}>
        <Container style={ container }>
          <ActivePage setActivePage={this.setActivePage} values={activePageObj.values} />
        </Container>
      </Provider>
    );
  }

  static async _cacheResourcesAsync() {
    //load fonts before render  dsdsddddd
    const fontAssets = Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf')
    });

    //init Db data before render
    const dbInit = App.setDbStatus();

    return Promise.all([fontAssets, dbInit]);
  }

  setActivePage(componentName, values) {

    this.setState({
      activePage: {
        name: componentName,
        values: values
      }
    });
  }

  getActivePage() {
    let returnValue = {
      component: undefined,
      values: this.state.activePage.values
    };

    switch (this.state.activePage.name) {
      case Pages.MINE_PAGE :
        returnValue.component = MinePageContent;
        break;
      case Pages.START_TIMER_PAGE :
        returnValue.component = StartTimerPageContent;
        break;
      default:
        returnValue.component = MinePageContent;
        break;
    }

    return returnValue;
  }

  static async setDbStatus() {
    const pizzaTimerModel = new PizzaTimerModel();
    if (await pizzaTimerModel.getItem('socket_0:isEmpty') === null || await pizzaTimerModel.getItem('socket_11:isEmpty') === null) {
      return DbInit.initPizzaTimer();
    }

    return new Promise((resolve, reject) => { resolve(true); reject(false); });
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 23
  }
});

export default App;

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Row, Spinner } from 'native-base';

import PizzaTimerModel from '../../storage/PizzaTimerModel';
import Timer from './Timer';
import EmptyMineSocketCont from './EmptyMineSocketCont';
import CloseTimerButton from './CloseTimerButton';

class MineSocket extends Component{

  constructor (props) {
    super(props);
    this.loadSocketData = this.loadSocketData.bind(this);
    this.loadSocketData();
  }

  pizzaTimerModel = new PizzaTimerModel();
  state = {
    socketData: {},
    isDbDataLoaded: false
  }

  loadSocketData() {
    const queryArray = [
      `${this.pizzaTimerModel.dbName}:socket_${ this.props.socketKey }:isEmpty`,
      `${this.pizzaTimerModel.dbName}:socket_${ this.props.socketKey }:pizza`,
      `${this.pizzaTimerModel.dbName}:socket_${ this.props.socketKey }:pizzaId`,
      `${this.pizzaTimerModel.dbName}:socket_${ this.props.socketKey }:size`,
      `${this.pizzaTimerModel.dbName}:socket_${ this.props.socketKey }:start`,
      `${this.pizzaTimerModel.dbName}:socket_${ this.props.socketKey }:finish`
    ];

    this.pizzaTimerModel.getMultipleItemsInObject(queryArray)
      .then(value => {
        this.afterSocketDataLoaded(value[`socket_${this.props.socketKey}`]);
      })
      .catch(e => console.log(e));
  }

  afterSocketDataLoaded(value) {
    value.isEmpty = (value.isEmpty  === 'true')
    this.setState({
      socketData: value,
      isDbDataLoaded: true
    });
  }

  render() {
    const { mineSocket } = styles;

    if (this.state.isDbDataLoaded) {

      const MineSocketContent = (this.state.socketData.isEmpty) ? EmptyMineSocketCont : Timer;
      const CloseButtonIfNeeded = (MineSocketContent === Timer) ? CloseTimerButton : View;

      return (
        <Row style={ mineSocket }>
          <CloseButtonIfNeeded socketKey={ this.props.socketKey } loadSocketData={ this.loadSocketData } reloadStats={this.props.reloadStats} socketData={this.state.socketData} />
          <MineSocketContent setActivePage={ this.props.setActivePage } socketKey={ this.props.socketKey } mine={ this.props.mine } socketData={ this.state.socketData } />
        </Row>
      );
    } else {
      return (
        <Row style={ mineSocket }>
          <Spinner color='blue' />
        </Row>
      );
    }
  }
}

const styles = StyleSheet.create({
  mineSocket: {
    height: 250,
    margin: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MineSocket;
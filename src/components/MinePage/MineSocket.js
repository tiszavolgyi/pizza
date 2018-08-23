import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Row, Spinner } from 'native-base';

import PizzaTimerModel from '../../storage/PizzaTimerModel';
import Timer from './Timer';
import EmptyMineSocketCont from './EmptyMineSocketCont';
import CloseTimerButton from './CloseTimerButton';
import MoveTimerButton from './MoveTimerButton'

class MineSocket extends Component{

  constructor (props) {
    super(props);
    this.loadSocketData = this.loadSocketData.bind(this);
    this.changeBgColor = this.changeBgColor.bind(this);
    this.loadSocketData();
  }

  pizzaTimerModel = new PizzaTimerModel();
  state = {
    socketData: {},
    isDbDataLoaded: false,
    bgColor: '#E0E0E0'
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
    const { mineSocket } = this.styles;
    const socketBackground = StyleSheet.create({
      bg: {
        backgroundColor: this.state.bgColor
      }
    });

    if (this.state.isDbDataLoaded) {

      const MineSocketContent = (this.state.socketData.isEmpty) ? EmptyMineSocketCont : Timer;
      const CloseButtonIfNeeded = (MineSocketContent === Timer) ? CloseTimerButton : View;
      const MoveTimerButtonIfNeeded = (MineSocketContent === Timer) ? MoveTimerButton : View;

      return (
        <Row style={ [mineSocket, socketBackground.bg] }>
          <MoveTimerButtonIfNeeded changeMoveUI={this.props.changeMoveUI} socketKey={ this.props.socketKey } socketData={this.state.socketData} />
          <CloseButtonIfNeeded socketKey={ this.props.socketKey } loadSocketData={ this.loadSocketData } changeBgColor={ this.changeBgColor } reloadStats={this.props.reloadStats} socketData={this.state.socketData} />
          <MineSocketContent isMoveUI={ this.props.isMoveUI } changeMoveUI={this.props.changeMoveUI} setActivePage={ this.props.setActivePage } changeBgColor={ this.changeBgColor } socketKey={ this.props.socketKey } mine={ this.props.mine } socketData={ this.state.socketData } />
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


  changeBgColor(color) {
    let colorCode;

    switch (color) {
      case 'red':
        colorCode = '#F30000';
        break;
      case 'yellow':
        colorCode = '#F49B00';
        break;
      case 'green':
        colorCode = '#67D075';
        break;
      case 'grey':
      default:
        colorCode = '#E0E0E0';
        break;
    }

    if(this.state.bgColor !== colorCode) {
      this.setState({ bgColor: colorCode})
    }
  }

  styles = StyleSheet.create({
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
}

export default MineSocket;

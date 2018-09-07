import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { Row, Spinner } from 'native-base';
import { connect } from 'react-redux';

import { loadSocketData } from '../../reduxActions/MineSocketLoadAction';
import CloseTimerButton from './CloseTimerButton'
import Timer from './Timer'
import EmptyMineSocketCont from './EmptyMineSocketCont'
import MoveTimerButton from './MoveTimerButton'

class MineSocket extends Component {

  constructor (props) {
    super(props);
    this.changeBgColor = this.changeBgColor.bind(this);
  }

  state = {
    bgColor: '#E0E0E0'
  }

  componentWillMount() {

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   //return !(nextProps.mineSocketData.isLoading && this.props.mineSocketData.isLoading)
  // }

  render() {

    console.log(`rendering socket ${this.props.socketKey}`);
    const { mineSocketData } = this.props;

    if (mineSocketData.isLoading || Object.keys(mineSocketData.data).length === 0 && mineSocketData.data.constructor === Object) {
      return this.getSpinnerView();
    }
    return this.getSocketView();
  }

  getSocketView() {
    const { mineSocket } = styles;
    //console.log(this.props.mineSocketData.data)
    const MineSocketContent = (this.props.mineSocketData.data.isEmpty) ? EmptyMineSocketCont : Timer;
    const CloseButtonIfNeeded = (MineSocketContent === Timer) ? CloseTimerButton : View;
    const MoveTimerButtonIfNeeded = (MineSocketContent === Timer) ? MoveTimerButton : View;

    return (
      <Row style={ [mineSocket, { backgroundColor: this.state.bgColor }] }>
        <MoveTimerButtonIfNeeded socketKey={ this.props.socketKey } socketData={this.props.mineSocketData} isMoveUI={ this.props.isMoveUI } />
        <CloseButtonIfNeeded socketKey={ this.props.socketKey } reloadStats={this.props.reloadStats} socketData={this.props.mineSocketData.data} />
        <MineSocketContent setActivePage={ this.props.setActivePage } changeBgColor={ this.changeBgColor } socketKey={ this.props.socketKey } mine={ this.props.mine } socketData={ this.props.mineSocketData } isMoveUI={ this.props.isMoveUI } changeMoveUI={ this.props.changeMoveUI } />
      </Row>
    );
  }

  getSpinnerView () {
    return (
      <Row style={ styles.mineSocket }>
        <Spinner color='blue' />
      </Row>
    );
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

  componentDidUpdate() {
    const { mineSocketData, loadSocketData, socketKey } = this.props;
    if (Object.keys(mineSocketData.data).length === 0 && mineSocketData.data.constructor === Object) { //isEmpty ...
      loadSocketData(socketKey);
    }
  }

  componentDidMount() {
    this.props.loadSocketData(this.props.socketKey);
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

const mapStateToProps = (state, ownProps) => {
  return { mineSocketData: state.mineSocketData[ownProps.socketKey] };
}


export default connect( mapStateToProps, { loadSocketData } )(MineSocket);

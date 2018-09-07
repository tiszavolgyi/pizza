import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon } from 'native-base';
import { StyleSheet, Text } from 'react-native';

import { loadSocketData, changeMoveUI } from '../../reduxActions/MineSocketLoadAction';
import PizzaTimerModel from '../../storage/PizzaTimerModel';
import PizzaStatisticModel from '../../storage/PizzaStatisticModel';


class CloseTimerButton extends Component {

  pizzaTimerModel = new PizzaTimerModel();
  pizzaStatisticModel = new PizzaStatisticModel();

  render() {
    const { closeButton } = styles;

    return (
      <Button transparent style={ closeButton } onPress={ () => this.onButtonPress() }>
        <Text><Icon name={'md-close-circle'} /></Text>
      </Button>
    );
  }

  onButtonPress() {
    this.pizzaTimerModel.setSocketToEmpty(this.props.socketKey)
      .then(() => {
        this.props.loadSocketData(this.props.socketKey);
      });

    this.pizzaStatisticModel.addNewStat(this.props.socketData)
      .then(() => {
        this.props.changeMoveUI(false);
        this.props.reloadStats();
      })
      .catch(e => console.log(e));
  }
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    bottom: 0,
    right: 10
  }
});

CloseTimerButton.propTypes = {
  socketKey: PropTypes.number.isRequired,
  loadSocketData: PropTypes.func.isRequired,
  socketData: PropTypes.object.isRequired,
  reloadStats: PropTypes.func.isRequired
};

export default connect(null, { loadSocketData, changeMoveUI })(CloseTimerButton);

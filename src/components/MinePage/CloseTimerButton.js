import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { StyleSheet, Text } from 'react-native';
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
        this.props.loadSocketData();
      });

    this.pizzaStatisticModel.addNewStat(this.props.socketData)
      .then(() => {
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
})

export default CloseTimerButton;
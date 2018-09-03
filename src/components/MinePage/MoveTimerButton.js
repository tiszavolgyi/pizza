import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import PizzaTimerModel from '../../storage/PizzaTimerModel';

class MoveTimerButton extends Component {

  pizzaTimerModel = new PizzaTimerModel();

  render() {
    const { moveButton } = styles;

    return (
      <Button transparent style={ moveButton } onPress={ () => this.onButtonPress() }>
        <Text><Icon name={'ios-disc-outline'} /></Text>
      </Button>
    );
  }

  onButtonPress() {
    this.props.changeMoveUI(true);
    this.pizzaTimerModel.getEmptySockets()
      .then((result) => {
        console.log(result);
      });
  }
}

const styles = StyleSheet.create({
  moveButton: {
    position: 'absolute',
    top: 0,
    left: 10
  }
});

MoveTimerButton.propTypes = {
  changeMoveUI: PropTypes.func.isRequired
};

export default MoveTimerButton;

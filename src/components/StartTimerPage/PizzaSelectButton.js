import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Left, Col, Right, Radio } from 'native-base';

class PizzaSelectButton extends Component {

  state = {
    pizzaSelected: [false, false, false, false, false, false, false, false, false, false, false, false]
  }

  componentWillMount() {

  }

  render() {
    const { pizzaSelectCol, radioButton } = style;

    return (
      <Col style={ pizzaSelectCol }>
        <Button bordered style={ radioButton } onPress={() => this.props.changeSelectedPizza(this.props.pizzaId)} >
          <Left>
            <Text>{ this.props.pizzaName }</Text>
          </Left>
          <Right>
            <Radio selected={this.props.isSelected} />
          </Right>
        </Button>
      </Col>
    );
  }
}

const style = StyleSheet.create({
  pizzaSelectCol: {
    margin: 10
  },
  radioButton: {
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default PizzaSelectButton;
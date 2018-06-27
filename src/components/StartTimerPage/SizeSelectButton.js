import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Left, Col, Right, Radio } from 'native-base';

class SizeSelectButton extends Component {

  render() {
    const { sizeSelectCol, radioButton } = style;

    return (
      <Col style={ sizeSelectCol }>
        <Button danger bordered style={ radioButton } onPress={() => this.props.changeSelectedSize(this.props.sizeId)}>
          <Left>
            <Text>{ this.props.sizeText }</Text>
          </Left>
          <Right>
            <Radio selected={ this.props.isSelected } />
          </Right>
        </Button>
      </Col>
    );
  }
}

const style = StyleSheet.create({
  sizeSelectCol: {
    margin: 10
  },
  radioButton: {
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default SizeSelectButton;
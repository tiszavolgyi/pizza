import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Col, Row, H3 } from 'native-base';

class Statistics extends Component {

  render() {

    const { wrapper } = style;
    const wrapperBackground = StyleSheet.create({
      bg: {
        backgroundColor: this.props.bgColor
      }
    });

    return (
      <Col size={20} style={[wrapper, wrapperBackground.bg]}>

      </Col>
    );
  }
}

const style = StyleSheet.create({
  wrapper: {
    height: 550,
    margin: 10
  }
});

export default Statistics;
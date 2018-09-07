import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon } from 'native-base';
import { StyleSheet, Text } from 'react-native';

import * as action from '../../reduxActions/MineSocketLoadAction';

class MoveTimerButton extends Component {

  render() {
    const { moveButton } = styles;

    return (
      <Button transparent style={ moveButton } onPress={ () => this.onButtonPress() }>
        <Text><Icon name={'ios-disc-outline'} /></Text>
      </Button>
    );
  }

  onButtonPress() {
    if (this.props.socketData.isMoveUI) {
      this.props.changeMoveUI(false)
    } else {
      this.props.changeMoveUI(true, this.props.socketKey);
    }
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

export default connect(null, action)(MoveTimerButton);

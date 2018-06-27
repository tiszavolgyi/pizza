import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { H3, Button } from 'native-base';
import Pages from '../../enum/Pages';

class EmptyMineSocketCont extends Component{

  render() {
    const { mineSocket, newButton } = styles;

    return (
      <View>
        <H3 style={{ textAlign: 'center' }}>Üres</H3>
        <Button onPress={() => this.props.setActivePage(Pages.START_TIMER_PAGE, { socketKey: this.props.socketKey, mine: this.props.mine })} success style={ newButton }>
          <Text>Új</Text>
        </Button>
      </View>
    );
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
  },
  newButton: {
    width: 70,
    justifyContent: 'center'
  }
})

export default EmptyMineSocketCont;
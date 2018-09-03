import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { H3, Button } from 'native-base';

import * as action from '../../reduxActions';
import Pages from '../../enum/Pages';

class EmptyMineSocketCont extends Component{

  constructor (props) {
    super(props);
  }

  render() {
    const { mineSocket, newButton } = styles;

    const h3Text = this.props.isMoveUI ? "Áthelyezés" : "Üres";
    const buttonText = this.props.isMoveUI ? "Ide" : "Új";

    return (
      <View>
        <H3 style={{ textAlign: 'center' }}>{ h3Text }</H3>
        <Button onPress={() => this.onButtonPress()} success style={ newButton }>
          <Text>{ buttonText }</Text>
        </Button>
      </View>
    );
  }

  onButtonPress() {
    if (this.props.isMoveUI === true) {
      this.props.updateMineSocketDbData([ this.props.socketKey ]);
      //TODO: write the logic here code here
      //TODO: lekerni a db adatokat a kivalasztott aknarol, amit ide akarok helyezni
      //TODO: berakni a db-be a lekert adatokat ehhez az aknahoz
      //TODO: kitorolni az adatokat az eredeti aknabol, es uresse tenni azt
      this.props.changeMoveUI(false);
    } else {
      this.props.setActivePage(Pages.START_TIMER_PAGE, { socketKey: this.props.socketKey, mine: this.props.mine })
    }
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

EmptyMineSocketCont.propTypes = {
  isMoveUi: PropTypes.bool.isRequired,
  socketKey: PropTypes.number.isRequired,
  changeMoveUI: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  mine: PropTypes.string.isRequired
};

export default connect(null, action)(EmptyMineSocketCont);

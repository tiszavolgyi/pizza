import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { H3, Button } from 'native-base';

import * as action from '../../reduxActions/MineSocketLoadAction';
import Pages from '../../enum/Pages';
import PizzaTimerModel from '../../storage/PizzaTimerModel'
import moment from 'moment'

class EmptyMineSocketCont extends Component{

  pizzaTimerModel = new PizzaTimerModel();
  constructor (props) {
    super(props);
  }

  render() {
    const { mineSocket, newButton } = styles;
    const h3Text = this.props.socketData.isMoveUI ? "Áthelyezés" : "Üres";
    const buttonText = this.props.socketData.isMoveUI ? "Ide" : "Új";

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
    if (this.props.socketData.isMoveUI === true) {
      this.pizzaTimerModel.getTimerData(this.props.selectedForReplace)
        .then(resp => {
          const dataToSend = this.buildDataForDb(this.props.socketKey, resp[`socket_${this.props.selectedForReplace}`])
          this.pizzaTimerModel.setMultipleItems(dataToSend)
            .then(resp => {
              this.pizzaTimerModel.setSocketToEmpty(this.props.selectedForReplace)
                .then(resp => {
                  this.props.loadSocketData(this.props.selectedForReplace);
                  this.props.loadSocketData(this.props.socketKey);
                  this.props.changeMoveUI(false);
                })
                .catch(error => {
                  console.log(error)
                })
            })
            .catch(error => {
              console.log(error);
            })
        })
        .catch(error =>{
          console.log(error);
        })
      //TODO: lekerni a db adatokat a kivalasztott aknarol, amit ide akarok helyezni
      //TODO: berakni a db-be a lekert adatokat ehhez az aknahoz
      //TODO: kitorolni az adatokat az eredeti aknabol, es uresse tenni azt
      //this.props.changeMoveUI(false);
    } else {
      this.props.setActivePage(Pages.START_TIMER_PAGE, { socketKey: this.props.socketKey, mine: this.props.mine })
    }
  }

  buildDataForDb(socketId, data) {
    const dbFrontKey = `${this.pizzaTimerModel.dbName}:socket_${socketId}`;

    return [
      [
        `${dbFrontKey}:start`,
        data.start
      ],
      [
        `${dbFrontKey}:finish`,
        data.finish
      ],
      [
        `${dbFrontKey}:pizza`,
        data.pizza
      ],
      [
        `${dbFrontKey}:pizzaId`,
        data.pizzaId
      ],
      [
        `${dbFrontKey}:size`,
        data.size
      ],
      [
        `${dbFrontKey}:isEmpty`,
        data.isEmpty
      ]
    ];
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
});

const mapStateToProps = state => {
  return {
    selectedForReplace: state.selectedForReplace.socketKey
  }
}

EmptyMineSocketCont.propTypes = {
  isMoveUI: PropTypes.bool.isRequired,
  socketKey: PropTypes.number.isRequired,
  changeMoveUI: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  mine: PropTypes.string.isRequired
};

export default connect(mapStateToProps, action)(EmptyMineSocketCont);

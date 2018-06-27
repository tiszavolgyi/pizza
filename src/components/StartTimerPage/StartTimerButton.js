import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Grid, Row, Button, H3 } from 'native-base';

import Pages from '../../enum/Pages';
import StartTimerFormHandler from '../../action/StartTimerFormHandler';

class StartTimerButton extends Component {

  render() {
    const { rowStyle, textStyle } = style;
    return (
      <Grid>
        <Row style={rowStyle}>
          <Button onPress={ () => this.buttonOnPress() }><H3 style={textStyle}>Indítás</H3></Button>
        </Row>
      </Grid>
    );
  }//ssdd

  buttonOnPress() {
    if (this.props.formData.selectedPizzaId !== undefined && this.props.formData.selectedSizeId !== undefined) {
      const startTimerFormHandler = new StartTimerFormHandler(this.props.formData.selectedPizzaId, this.props.formData.selectedSizeId);

      startTimerFormHandler.addDataToStorage(this.props.socketKey)
        .then(() => {
            this.props.setActivePage(Pages.MINE_PAGE);
          }).catch(e => {
            console.log(e);
          });
    }
  }
}

const style = StyleSheet.create({
  rowStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  textStyle: {
    textAlign: 'center',
    margin: 45,
    color: '#fff'
  }
});

export default StartTimerButton;
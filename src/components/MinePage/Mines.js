import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Col, Row, Grid, H3 } from 'native-base';
import MineSocket from './MineSocket';


class Mines extends Component {

  render() {

    const { mine, mineTitleRow, mineTitle, mineCol } = style;
    return (
      <Col size={80}>
        <Grid>
          <Col size={50} style={ [mine, {backgroundColor: '#636363'}] }>
            <Row size={7} style={ mineTitleRow }><H3 style={ mineTitle }>{ 'Alsó akna' }</H3></Row>
            <Row size={93}>
              <Col style={ mineCol }>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={0} mine={ 'Alsó akna' }/>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={1} mine={ 'Alsó akna' }/>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={2} mine={ 'Alsó akna' }/>
              </Col>
              <Col style={ mineCol }>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={3} mine={ 'Alsó akna' }/>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={4} mine={ 'Alsó akna' }/>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={5} mine={ 'Alsó akna' }/>
              </Col>
            </Row>
          </Col>
          <Col size={50} style={ [mine, {backgroundColor: '#333333'}] }>
            <Row size={7} style={ mineTitleRow }><H3 style={ mineTitle }>{ 'Felső akna' }</H3></Row>
            <Row size={93}>
              <Col style={ mineCol }>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={6} mine={ 'Felső akna' }/>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={7} mine={ 'Felső akna' }/>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={8} mine={ 'Felső akna' }/>
              </Col>
              <Col style={ mineCol }>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={9} mine={ 'Felső akna' }/>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={10} mine={ 'Felső akna' }/>
                <MineSocket setActivePage={this.props.setActivePage} reloadStats={this.props.reloadStats} socketKey={11} mine={ 'Felső akna' }/>
              </Col>
            </Row>
          </Col>
        </Grid>
      </Col>
    );
  }
}

const style = StyleSheet.create({
  mine: {
    height: 550,
    margin: 10
  },
  mineTitleRow: {
    justifyContent: 'center'
  },
  mineTitle: {
    textAlign: 'center',
    padding: 5,
    color: '#E0E0E0'
  },
  mineCol: {
    height: 500
  }
});

export default Mines;
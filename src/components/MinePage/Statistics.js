import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Col, H3, Grid, Button, Icon, Spinner } from 'native-base';
import moment from 'moment';

import PizzaStatisticModel from '../../storage/PizzaStatisticModel';
import PizzaList from '../../config/PizzaList';

class Statistics extends Component {

  constructor (props) {
    super(props);
    this.reloadStats = this.reloadStats.bind(this);

  }

  pizzaStatisticModel = new PizzaStatisticModel();
  renderedStatList = [];


  state = {
    actualStatDate: moment().format('YYYY-MM-DD').toString(),
    readableStatDate: moment().format('YYYY MM. DD.').toString(),
    isDbDataLoaded: false
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }


  render() {
    const { wrapper, arrowLeft, arrowRight } = style;
    const wrapperBackground = StyleSheet.create({
      bg: {
        backgroundColor: this.props.bgColor
      }
    });

    this.getRenderedStatistics();

    if( this.state.isDbDataLoaded ) {
      return (
        <Col size={20} style={[wrapper, wrapperBackground.bg]}>
          <H3 style={{ color: '#fff', textAlign: 'center', marginTop: 5 }}>Statisztika</H3>
          <Grid style={{flex: 0}}>
            <Col size={20}>
              <Button style={ arrowLeft } transparent light onPress={ () => this.onLeftButtonPress() }>
                <Text><Icon name={'arrow-dropleft-circle'} /></Text>
              </Button>
            </Col>
            <Col size={60}><Text style={{textAlign: 'center', marginTop: 13, color: '#fff'}}>{this.state.readableStatDate}</Text></Col>
            <Col size={20}>
              <Button style={ arrowRight } transparent light onPress={ () => this.onRightButtonPress() }>
                <Text><Icon name={'arrow-dropright-circle'} /></Text>
              </Button>
            </Col>
          </Grid>
          { this.renderedStatList }
        </Col>
      );
    } else {
      return <Spinner color='blue' />
    }
  }

  onLeftButtonPress() {
    this.setState({
      actualStatDate: moment(this.state.actualStatDate).subtract(1, 'days').format('YYYY-MM-DD').toString(),
      readableStatDate: moment(this.state.actualStatDate).subtract(1, 'days').format('YYYY MM. DD.').toString(),
      isDbDataLoaded: false
    })
  }

  onRightButtonPress() {
    this.setState({
      actualStatDate: moment(this.state.actualStatDate).add(1, 'days').format('YYYY-MM-DD').toString(),
      readableStatDate: moment(this.state.actualStatDate).add(1, 'days').format('YYYY MM. DD.').toString(),
      isDbDataLoaded: false
    })
  }

  reloadStats() {
    this.setState({
      isDbDataLoaded: false
    });
  }

  getRenderedStatistics() {
    if (this.state.isDbDataLoaded === false) {
      const { pizzaListItem } = style;
      this.pizzaStatisticModel.getPizzaStatListByDate(moment(this.state.actualStatDate).format('YYYYMMDD').toString())
        .then(value => {
          this.renderedStatList = [];
          for (let pizzaId in value) {
            this.renderedStatList[pizzaId] = (
              <Text key={pizzaId} style={ pizzaListItem }>{`${PizzaList[pizzaId]['name']}: ${value[pizzaId]}`}</Text>
            )
          }
          if (!this.renderedStatList.length) {
            this.renderedStatList[0] = <Text key={0} style={ pizzaListItem }>Nincs adat</Text>
          }
          this.setState({ isDbDataLoaded: true });
        }).catch(e => console.log(e));
    }
  }
}
//ssddfffhh
const style = StyleSheet.create({
  wrapper: {
    height: 550,
    margin: 10
  },
  arrowLeft: {
    marginLeft: 5
  },
  arrowRight: {
    alignSelf: 'flex-end',
    marginRight: 5
  },
  pizzaListItem: {
    color: '#fff',
    margin: 5
  }
});

export default Statistics;
import React, { Component } from 'react';
import PizzaList from '../../config/PizzaList.json';
import { Grid, Row, H3 } from 'native-base';

import PizzaSelectButton from './PizzaSelectButton';
import { StyleSheet } from 'react-native'

class PizzaSelect extends Component {

  constructor (props) {
    super(props);
    this.changeSelectedPizza = this.changeSelectedPizza.bind(this);
  }

  state = {
    pizzaSelected: []
  }
  renderedList = [];

  componentWillMount() {
    this.initPizzaSelectedState();
  }

  changeSelectedPizza(pizzaKey) {
    let tmpValue = [];
    this.state.pizzaSelected.forEach((val, key) => {
      tmpValue[key] = (key === pizzaKey);
    });

    this.setState({ pizzaSelected: tmpValue });
    this.props.changeFormPizzaSelectState(pizzaKey);
  }

  initPizzaSelectedState() {
    if (this.state.pizzaSelected.length === 0) {
      this.state.pizzaSelected = PizzaList.map(() => false);
    }
  }

  renderPizzaList() {
    let counter = 0;
    let rowCounter = 0;
    let tmpPizzaSelectList = [];

    const renderedPizzaSelectList = PizzaList.map((data, index) => {
      return (
        <PizzaSelectButton pizzaName={ data.name } pizzaId={ index } key={ index } isSelected={this.state.pizzaSelected[index]} changeSelectedPizza={this.changeSelectedPizza} />
      );
    });

    renderedPizzaSelectList.forEach((value, index) => {
      tmpPizzaSelectList[counter] = value;

      counter++;
      if (counter === 4 || index === renderedPizzaSelectList.length - 1) {
        this.renderedList[rowCounter] = (
          <Row key={rowCounter}>
            <Grid>
              { tmpPizzaSelectList }
            </Grid>
          </Row>
        );
        counter = 0;
        rowCounter++;
        tmpPizzaSelectList = [];
      }
    });
  }

  render() {
    this.renderPizzaList();

    return (
      <Grid>
        <Row style={{ justifyContent: 'center' }}>
          <H3 style={{ textAlign: 'center', margin: 10 }}>Válassz pizzát</H3>
        </Row>
        { this.renderedList }
      </Grid>
    );
  }
}

export default PizzaSelect;
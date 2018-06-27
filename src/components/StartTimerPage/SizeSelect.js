import React, { Component } from 'react';
import { Grid, Row, H3 } from 'native-base';

import SizeSelectButton from './SizeSelectButton';
import SizeList from '../../config/SizeList';

class SizeSelect extends Component {

  constructor (props) {
    super(props);
    this.changeSelectedSize = this.changeSelectedSize.bind(this);
  }

  state = {
    sizeSelected: [false, false, false]
  }

  renderedList = [];

  componentWillMount() {
    this.initSizeSelectedState();
  }

  renderSizeList() {
    this.renderedList = SizeList.map((value, index) => {
      return (
        <SizeSelectButton key={ index } sizeId={ index } isSelected={ this.state.sizeSelected[index] } sizeText={ value.name } changeSelectedSize={ this.changeSelectedSize } />
      );
    });
  }

  changeSelectedSize( sizeKey ) {
    let tmpValue = [];
    this.state.sizeSelected.forEach((val, key) => {
      tmpValue[key] = (key === sizeKey);
    });

    this.setState({ sizeSelected: tmpValue });
    this.props.changeFormSizeSelectState(sizeKey);
  }

  initSizeSelectedState() {
    if (this.state.sizeSelected.length === 0) {
      this.state.sizeSelected = SizeList.map(() => false);
    }
  }

  render() {
    this.renderSizeList();

    return (
      <Grid>
        <Row style={{ justifyContent: 'center' }}>
          <H3 style={{ textAlign: 'center', margin: 10 }}>Válassz méretet</H3>
        </Row>
        <Row>
          { this.renderedList }
        </Row>
      </Grid>
    );
  }
}

export default SizeSelect;
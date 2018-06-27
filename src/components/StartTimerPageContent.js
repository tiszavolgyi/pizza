import React, { Component } from 'react';
import { Button, Content, Header, Left, Icon, Body, Title } from 'native-base';
import Page from '../enum/Pages';

import PizzaSelect from './StartTimerPage/PizzaSelect';
import SizeSelect from './StartTimerPage/SizeSelect';
import StartTimerButton from './StartTimerPage/StartTimerButton';

class StartTimerPageContent extends Component{

  constructor (props) {
    super(props);

    this.changeFormPizzaSelectState = this.changeFormPizzaSelectState.bind(this);
    this.changeFormSizeSelectState = this.changeFormSizeSelectState.bind(this);
  }

  state = {
    formData: {
      selectedPizzaId: undefined,
      selectedSizeId: undefined
    }
  }

  changeFormPizzaSelectState( pizzaId ) {
    this.setState({
      formData: {
        selectedPizzaId: pizzaId,
        selectedSizeId: this.state.formData.selectedSizeId
      }
    });
  }

  changeFormSizeSelectState( sizeId ) {
    this.setState({
      formData: {
        selectedPizzaId: this.state.formData.selectedPizzaId,
        selectedSizeId: sizeId
      }
    });
  }

  render() {
    return (
      <Content>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.setActivePage(Page.MINE_PAGE)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
          <Title>{ this.props.values.mine }</Title>
          </Body>
        </Header>
        <PizzaSelect changeFormPizzaSelectState={ this.changeFormPizzaSelectState } />
        <SizeSelect changeFormSizeSelectState={ this.changeFormSizeSelectState } />
        <StartTimerButton socketKey={ this.props.values.socketKey } formData={ this.state.formData } setActivePage={this.props.setActivePage} />
      </Content>
    );
  }
}

export default StartTimerPageContent;
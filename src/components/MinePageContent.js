import React, { Component } from 'react';
import Mines from './MinePage/Mines';
import Statistics from './MinePage/Statistics';
import { Content, Grid } from 'native-base';

class MinePageContent extends Component {
  render() {

    return (
      <Content>
        <Grid>
          <Mines setActivePage={this.props.setActivePage} />
          <Statistics bgColor={"#636363"} />
        </Grid>
      </Content>
    );
  }
}

export default MinePageContent;
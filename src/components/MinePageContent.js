import React, { Component } from 'react';
import Mines from './MinePage/Mines';
import Statistics from './MinePage/Statistics';
import { Content, Grid, Col } from 'native-base';
import DragComponentTest from './DragDropTest/DragComponentTest';
import ScreenTest from './DragDropTest/ScreenTest';

class MinePageContent extends Component {

  constructor (props) {
    super(props);
    this.reloadStats = this.reloadStats.bind(this);
  }

  render() {
    /*
    * <Content>
        <Grid>
          <Mines setActivePage={this.props.setActivePage} reloadStats={this.reloadStats}/>
          <Statistics onRef={ref => (this.child = ref)} bgColor={"#636363"} />
        </Grid>
      </Content> */
    return (
    <ScreenTest/>
    );
  }

  reloadStats() {
    this.child.reloadStats();
  }
}

export default MinePageContent;

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import momentDurationFormatSetup from 'moment-duration-format';
import moment from 'moment';
import PizzaTimerModel from '../../storage/PizzaTimerModel';

class Timer extends Component {

  constructor (props) {
    super(props);
    momentDurationFormatSetup(moment);
  }

  state = {
    socketData: this.props.socketData,
    start: undefined,
    finish: undefined,
    timeLeft: undefined,
    formattedTimeLeft: undefined,
    timeProgress: 100
  };

  timeCounter = undefined;
  pizzaTimerModel = new PizzaTimerModel();

  componentWillUnmount() {
    clearInterval(this.timeCounter);
  }

  render() {
    if (!this.timeCounter) {
      this.getDbData()
        .then(data => {
          this.startTimer(data[`socket_${this.props.socketKey}`]);
        })
        .catch(e => console.log(e))
    }

    return (
      <View style={{width: 100}}>
        <AnimatedCircularProgress
          size={100}
          width={3}
          fill={this.state.timeProgress}
          tintColor="#00e0ff"
          backgroundColor="#3d5875">
          {
            (fill) => (
              <View>
                <Text style={{alignContent: 'center'}}> { this.state.socketData.pizza } </Text>
                <Text style={{alignContent: 'center'}}> { this.formattedTimeLeft() } </Text>
              </View>
            )
          }
        </AnimatedCircularProgress>
      </View>
    )
  }

  getDbData() {
    return this.pizzaTimerModel.getTimerData(this.props.socketKey);
  }

  startTimer(savedData) {
    let startDate = savedData.start;
    let finishDate = savedData.finish;
    let duration = finishDate - startDate;
    this.state.socketData.finish = finishDate;
    this.timer(startDate, finishDate, duration);
  }

  timer (startDate, finishDate, duration) {

    let timeLeft = 1;
    this.timeCounter = setInterval(() => {
      timeLeft = finishDate - moment().format('x').toString();
      if (timeLeft < 0) {
        timeLeft = 0;
      }

      this.setState({timeProgress: timeLeft/duration*100, timeLeft: timeLeft.toString()});

      if (timeLeft === 0) {
        clearInterval(this.timeCounter);
        this.timeCounter = undefined;
        this.onTimerFinished();
      }
    }, 1000);
  }

  formattedTimeLeft() {
    return moment.duration.format([moment.duration(parseInt(this.state.timeLeft, 10))], 'mm:ss', { trim: false }).toString()
  }

  onTimerFinished() {

    console.log('done');
  }


}

export default Timer;
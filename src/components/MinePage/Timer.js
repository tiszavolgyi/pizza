import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import momentDurationFormatSetup from 'moment-duration-format';
import moment from 'moment';

class Timer extends Component {

  constructor (props) {
    super(props);
    momentDurationFormatSetup(moment);
  }

  state = {
    start: undefined,
    finish: undefined,
    timeLeft: undefined,
    formattedTimeLeft: undefined,
    timeProgress: 100
  };

  timeCounter = undefined;

  componentWillUnmount() {
    clearInterval(this.timeCounter);
    this.props.changeBgColor('grey');
  }
  componentWillUpdate() {
    clearInterval(this.timeCounter);
    this.initTimer(this.props.socketData.data)
  }

  componentWillMount() {
    this.initTimer(this.props.socketData.data)
  }

  render() {

      return (
        <View style={{width: 110}}>
          <AnimatedCircularProgress
            size={110}
            width={3}
            fill={this.state.timeProgress}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <View style={{alignContent: 'center'}}>
                  <Text style={{alignSelf: 'center'}}> { this.props.socketData.data.pizza } </Text>
                  <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}> { this.formattedTimeLeft() } </Text>
                </View>
              )
            }
          </AnimatedCircularProgress>
        </View>
      )

    //}
  }

  initTimer(savedData) {
    if (this.getTimeLeft(savedData.finish) < 0) {
      this.state.timeProgress = 0;
      this.props.changeBgColor('red');
    } else {
      this.startTimer(savedData);
    }
  }

  getTimeLeft(finishDate) {
    return finishDate - moment().format('x').toString();
  }

  startTimer(savedData) {
    let startDate = savedData.start;
    let finishDate = savedData.finish;
    let duration = finishDate - startDate;
    this.timer(startDate, finishDate, duration);
  }

  timer (startDate, finishDate, duration) {

    let timeLeft = 1;
    this.timeCounter = setInterval(() => {
      timeLeft = this.getTimeLeft(finishDate);

      if (timeLeft > 60000) {
        this.props.changeBgColor('green');
      } else if(timeLeft > 15000) {
        this.props.changeBgColor('yellow');
      } else {
        this.props.changeBgColor('red');
      }

      if (timeLeft < 0) {
        timeLeft = 0;
      }

      this.setState({timeProgress: timeLeft/duration*100, timeLeft: timeLeft.toString()});

      if (timeLeft === 0) {
        clearInterval(this.timeCounter);
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

Timer.propTypes = {
  socketData: PropTypes.object.isRequired,
  socketKey: PropTypes.number.isRequired,
  changeBgColor: PropTypes.func.isRequired
};

export default Timer;

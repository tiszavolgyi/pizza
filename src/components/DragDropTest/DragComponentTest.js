import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
  View
} from "react-native";

class DragComponentTest extends Component {

  constructor (props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1)
    };
    this.panResponder = undefined;
  }

  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);

    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: (evt, gestureState) => {
        //console.log(gestureState);
        Animated.event([
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]);
        // adjusting delta value
        //this.state.pan.setValue({ x:gestureState.moveX-(CIRCLE_RADIUS), y:gestureState.moveY-(CIRCLE_RADIUS)})
        this.state.pan.setValue({ x:gestureState.dx, y:gestureState.dy})
      },
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropArea(gesture)) {
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 1000
          }).start(() =>
            this.setState({
              showDraggable: false
            })
          );
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start();
        }
        /*Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5
        }).start();  */
      }

    });
  }

  isDropArea(gesture) {
    return gesture.moveY < 200;
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.circle, {opacity: this.state.opacity}]}
      />

    );
  }

  reloadStats() {
    this.child.reloadStats();
  }
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  }
});

export default DragComponentTest;

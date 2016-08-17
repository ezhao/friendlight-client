import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Slider,
  Animated,
} from 'react-native';
import {
  friendIdRequestUrl,
  generatePost,
} from './Constants';

const RANGE_START = 1;
const RANGE_END = 365;
const SAVE_INDICATOR_IN_PROGRESS = "Saving..."
const SAVE_INDICATOR_ERROR = "Error saving"

class FriendContactIntervalEditor extends Component {
  static propTypes = {
    contactInterval: React.PropTypes.number.isRequired,
    friendId: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      _saveIndicatorAnimated: new Animated.Value(0),
      lastSavedValue: this.props.contactInterval,
    };
  }

  render() {
    var saveIndicatorColor = {color: this.getSaveIndicatorColor()};
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.titleText}>Contact interval</Text>
          <Animated.Text style={[styles.saveIndicator, saveIndicatorColor]}>{this.state.saveIndicatorText}</Animated.Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.sliderValue}>{this.state.contactInterval || this.props.contactInterval}</Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.sliderRange}>{RANGE_START}</Text>
          <Slider
            style={styles.slider}
            minimumValue={RANGE_START}
            maximumValue={RANGE_END}
            step={1}
            value={this.props.contactInterval}
            onValueChange={(value) => this.setState({contactInterval: value})}
            onSlidingComplete={(value) => this.saveContactInterval(value)}
          />
          <Text style={styles.sliderRange}>{RANGE_END}</Text>
        </View>
      </View>
    );
  }

  getSaveIndicatorColor = () => {
    if (this.isSaving()) {
      return 'rgba(200, 100, 0, 1)';
    } else if (this.isSavingError()) {
      return 'rgba(200, 0, 0, 1)'
    } else if (this.state.saveIndicatorText) {
      return this.state._saveIndicatorAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0, 200, 0, 0.0)', 'rgba(0, 200, 0, 1.0)']
      });
    }
    return 'rgba(0, 0, 0, 1)';
  };

  isSaving = () => {
    return this.state.saveIndicatorText == SAVE_INDICATOR_IN_PROGRESS;
  };

  isSavingError = () => {
    return this.state.saveIndicatorText == SAVE_INDICATOR_ERROR;
  };

  saveContactInterval = (value) => {
    this.setState({saveIndicatorText: SAVE_INDICATOR_IN_PROGRESS});
    this.state._saveIndicatorAnimated.setValue(1);

    var options = generatePost({contactInterval: value});
    var url = friendIdRequestUrl(this.props.friendId);
    fetch(url, options)
      .then((responseBody) => responseBody.json())
      .then((response) => this.onSaveSuccess(value))
      .catch((error) => this.onSaveError(error))
      .done();
  };

  onSaveSuccess = (value) => {
    this.setState({
      contactInterval: value,
      saveIndicatorText: "Saved!",
    });
    Animated.timing(this.state._saveIndicatorAnimated, {
        toValue: 0,
        duration: 2000,
      }).start(() => this.setState({saveIndicatorText: null}));
  };

  onSaveError = (error) => {
    this.setState({saveIndicatorText: SAVE_INDICATOR_ERROR});
    console.log(error);
  };
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
  },
  saveIndicator: {
    padding: 8,
  },
  slider: {
    flex: 1,
  },
  sliderRange: {
    padding: 8,
  },
  sliderValue: {
    flex: 1,
    textAlign: 'center',
  },
});

module.exports = FriendContactIntervalEditor;

import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Slider,
} from 'react-native';
import {
	friendIdRequestUrl,
	generatePost,
} from './Constants';

class FriendContactIntervalEditor extends Component {
  static propTypes = {
		contactInterval: React.PropTypes.number.isRequired,
    friendId: React.PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
        <Text>Contact interval</Text>
        <View style={styles.row}>
          <Text style={styles.sliderRange}>1</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={365}
            step={1}
            value={this.props.contactInterval}
            onValueChange={(value) => this.setState({contactInterval: value})}
            onSlidingComplete={(value) => this.saveContactInterval(value)}
          />
          <Text style={styles.sliderRange}>365</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.sliderValue}>{this.state.contactInterval || this.props.contactInterval}</Text>
        </View>
			</View>
		);
	}

	saveContactInterval = (value) => {
		//TODO need to show saving/saved state
		var options = generatePost({contactInterval: value});
		var url = friendIdRequestUrl(this.props.friendId);

		fetch(url, options)
			.then((responseBody) => responseBody.json())
			.then((response) => this.setState({contactInterval: value}))
			.catch((error) => console.log(error))
			.done();
	};
}

var styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
	},
	slider: {
		flex: 1,
		padding: 8,
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

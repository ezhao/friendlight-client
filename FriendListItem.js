import React, {Component} from 'react';
import {
		StyleSheet,
		TouchableHighlight,
		View,
		PanResponder,
		Text,
		Animated,
		Dimensions
} from 'react-native';

class FriendListItem extends Component {
	static propTypes = { // todo emily not sure if this is doing anything at all
		friend: React.PropTypes.object.isRequired,
		onSelect: React.PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this._panResponder = {};

		this.state = {
			_animatedLeft: new Animated.Value(0),
			color: '#CCC'
		};
	}

	render() {
		var friend = this.props.friend;

		var dynamicStyle = {
			transform: [{translateX: this.state._animatedLeft}]
		};

		var dynamicBackgroundStyle = {
			backgroundColor: this.state.color
		}

		return (
				<TouchableHighlight style={dynamicBackgroundStyle}>
					<Animated.View
							style={[styles.friendContainer, dynamicStyle]}
							{...this._panResponder.panHandlers}>
						<Text style={styles.name}>{friend.name}</Text>
					</Animated.View>
				</TouchableHighlight>
		)
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: this._handlePanResponderEnd,
			onPanResponderTerminate: this._handlePanResponderEnd
		});
	}

	_handlePanResponderMove = (e: Object, gestureState: Object) => {
		this.state._animatedLeft.setValue(gestureState.dx);
		if (Math.abs(gestureState.dx) >= 100) {
			this.setState({color: 'blue'});
		} else {
			this.setState({color: '#CCC'});
		}
	};

	_handlePanResponderEnd = (e: Object, gestureState: Object) => {
		if (Math.abs(gestureState.dx) < 20) {
			this.state._animatedLeft.setValue(0);

			var onSelect = this.props.onSelect;
			var friend = this.props.friend;
			onSelect(friend);
		} else {
			Animated.spring(this.state._animatedLeft, {
					toValue: 0
				}).start();
		}
		this.setState({color: '#CCC'});
	};
}

var styles = StyleSheet.create({
	friendContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		height: 64,
		paddingLeft: 12,
		paddingRight: 12,
		borderBottomWidth: 1,
		borderColor: '#EEE',
		backgroundColor: "#FFF"
	},
	name: {
		fontSize: 14
	}
});

module.exports = FriendListItem;

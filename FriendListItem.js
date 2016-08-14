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
			color: '#FFF'
		};
	}

	render() {
		var onSelect = this.props.onSelect;
		var friend = this.props.friend;

		var dynamicStyle = {
			transform: [{translateX: this.state._animatedLeft}],
			backgroundColor: this.state.color
		};

		return (
				<TouchableHighlight onPress={() => onSelect(friend)}>
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
			onPanResponderGrant: this._handlePanResponderGrant,
			onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: this._handlePanResponderEnd,
			onPanResponderTerminate: this._handlePanResponderEnd
		});
	}

	_handlePanResponderGrant = (e: Object, gestureState: Object) => {
		this.setState({color: 'blue'});
	};

	_handlePanResponderMove = (e: Object, gestureState: Object) => {
		this.state._animatedLeft.setValue(gestureState.dx);
	};

	_handlePanResponderEnd = (e: Object, gestureState: Object) => {
		Animated.spring(this.state._animatedLeft, {
				toValue: 0
			}).start();
		this.setState({color: '#FFF'});
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
	},
	name: {
		fontSize: 14
	}
});

module.exports = FriendListItem;

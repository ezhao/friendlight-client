import moment from 'moment';
import React, {Component} from 'react';
import {
		StyleSheet,
		View,
		PanResponder,
		Text,
		Animated,
		Dimensions
} from 'react-native';

class FriendListItem extends Component {
	static propTypes = { // todo emily not sure if this is doing anything at all
		friend: React.PropTypes.object.isRequired,
		onSelect: React.PropTypes.func.isRequired,
		setParentScrollState: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this._panResponder = {};

		this.state = {
			_animatedLeft: new Animated.Value(0),
			_animatedOpacity: new Animated.Value(1),
			color: '#CCC',
		};
	}

	render() {
		var friend = this.props.friend;
		var nextInteraction = new moment(new Date(friend.nextInteraction));

		var dynamicStyle = {
			transform: [{translateX: this.state._animatedLeft}],
			opacity: this.state._animatedOpacity,
		};

		var dynamicBackgroundStyle = {
			backgroundColor: this.state.color
		}

		return (
				<View style={dynamicBackgroundStyle}>
					<Animated.View
							style={[styles.friendContainer, dynamicStyle]}
							{...this._panResponder.panHandlers}>
						<View>
							<Text style={styles.name}>{friend.name}</Text>
							<Text style={styles.name}>Next: {nextInteraction.format("h:mma MMMM Do, YYYY")}</Text>
						</View>
					</Animated.View>
				</View>
		)
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderGrant: this._handlePanResponderGrant,
			onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: this._handlePanResponderRelease,
			onPanResponderTerminate: this._handlePanResponderTerminate
		});
	}

	_handlePanResponderGrant = (e: Object, gestureState: Object) => {

	};

	_handlePanResponderMove = (e: Object, gestureState: Object) => {
		var xMagnitude = Math.abs(gestureState.dx);
		var yMagnitude = Math.abs(gestureState.dy);

		this.state._animatedLeft.setValue(gestureState.dx);
		if (xMagnitude >= 100) {
			this.setState({color: 'blue'});
		} else {
			this.setState({color: '#CCC'});
		}

		var setParentScrollState = this.props.setParentScrollState;
		if (setParentScrollState) {
			var verticallyScrolling = yMagnitude >= 1 && yMagnitude > xMagnitude;
			setParentScrollState(verticallyScrolling);
		}
	};

	_handlePanResponderRelease = (e: Object, gestureState: Object) => {
		if (Math.abs(gestureState.dx) < 20) {
			this.state._animatedLeft.setValue(0);

			var onSelect = this.props.onSelect;
			var friend = this.props.friend;
			Animated.sequence([
				Animated.timing(this.state._animatedOpacity, {toValue: 0.5, duration: 25}),
				Animated.timing(this.state._animatedOpacity, {toValue: 1.0, duration: 50}),
			]).start();

			onSelect(friend);
		} else {
			Animated.spring(this.state._animatedLeft, {
					toValue: 0
				}).start();
		}
		this.setState({color: '#CCC'});

		var setParentScrollState = this.props.setParentScrollState;
		if (setParentScrollState) {
			setParentScrollState(true);
		}
	};

	_handlePanResponderTerminate = (e: Object, gestureState: Object) => {
		// honestly shouldn't happen with the scrollState stuff but you never know
		Animated.spring(this.state._animatedLeft, {
				toValue: 0
			}).start();
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

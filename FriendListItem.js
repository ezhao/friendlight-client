import React, {Component} from 'react';
import {
		StyleSheet,
		TouchableHighlight,
		View,
		PanResponder,
		Text
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
			_previousLeft: 0,
			left: 0,
			color: '#FFF'
		};
	}

	render() {
		var onSelect = this.props.onSelect;
		var friend = this.props.friend;

		var dynamicStyle = {
			left: this.state.left,
			backgroundColor: this.state.color
		};

		return (
				<TouchableHighlight onPress={() => onSelect(friend)}>
					<View
							style={[styles.friendContainer, dynamicStyle]}
							{...this._panResponder.panHandlers}>
						<Text style={styles.name}>{friend.name}</Text>
					</View>
				</TouchableHighlight>
		)
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
			onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
			onPanResponderGrant: this._handlePanResponderGrant,
			onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: this._handlePanResponderEnd,
			onPanResponderTerminate: this._handlePanResponderEnd
		});
	}

	_handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
		// Should we become active when the user presses down on the circle?
		return true;
	}

	_handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
		// Should we become active when the user moves a touch over the circle?
		return true;
	}

	_handlePanResponderGrant = (e: Object, gestureState: Object) => {
		this.setState({color: 'blue'});
	};

	_handlePanResponderMove = (e: Object, gestureState: Object) => {
		this.setState({left: this.state._previousLeft + gestureState.dx});
	};

	_handlePanResponderEnd = (e: Object, gestureState: Object) => {
		this.setState({
			color: '#FFF',
			_previousLeft: this.state._previousLeft + gestureState.dx
		});
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

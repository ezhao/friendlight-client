import React, {Component} from 'react';
import {
		StyleSheet,
		TouchableHighlight,
		View,
		Text
} from 'react-native';

class FriendListItem extends Component {
	propTypes: { // todo emily not sure if this is doing anything at all
			friend: React.PropTypes.element.isRequired,
			onSelect: React.PropTypes.element.isRequired
			};

	render() {
		var onSelect = this.props.onSelect;
		var friend = this.props.friend;
		return (
				<TouchableHighlight onPress={() => onSelect(friend)}>
					<View style={styles.friendContainer}>
						<Text style={styles.name}>{friend.name}</Text>
					</View>
				</TouchableHighlight>
		)
	}
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
		backgroundColor: '#FFF'
	},
	name: {
		fontSize: 14
	}
});

module.exports = FriendListItem;

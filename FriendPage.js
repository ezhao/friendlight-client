import React, {Component} from 'react';
import {
		TouchableHighlight,
		StyleSheet,
		Text,
		View
} from 'react-native';

class FriendPage extends Component {
	render() {
		var TouchableElement = TouchableHighlight;
		return (
				<View>
					<TouchableElement
							onPress={this.props.onSelect}
							onShowUnderlay={this.props.onHighlight}
							onHideUnderlay={this.props.onUnhighlight}>
						<View style={styles.row}>
							<View style={styles.textContainer}>
								<Text style={styles.name} numberOfLines={2}>
									{this.props.friend.name}
								</Text>
							</View>
						</View>
					</TouchableElement>
				</View>
		);
	}
}

var styles = StyleSheet.create({
	textContainer: {
		flex: 1,
		paddingTop: 60
	},
	name: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 2
	},
	row: {
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'row',
		padding: 5
	}
});

module.exports = FriendPage;

import React, {Component} from 'react';
import {
		AppRegistry,
		Image,
		TouchableHighlight,
		StyleSheet,
		Text,
		TextInput,
		ListView,
		View
} from 'react-native';
import { REQUEST_URL } from './Constants';

var FRIEND_LIST_INDEX = 0;

class AddFriendPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}

	render() {
		return (
				<View style={styles.container}>
					<View style={styles.row}>
						<TextInput
								style={styles.nameInput}
								onChangeText={(text) => this.setState({name: text})}
								returnKeyType="done" />
					</View>
					<SubmitFriendButton onSelect={this.onSubmitFriend} />
				</View>
		)
	}

	onSubmitFriend = () => {
		this.updateFriend(this.state.name);
	};

	updateFriend(name) {
		var options = {
			method: 'POST',
			headers: {
				'Accept': 'text/plain',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name
			})
		};

		fetch(REQUEST_URL, options)
				.then((responseBody) => responseBody.json())
				.then((response) => {
					if (this.props.friendListCallback) {
						this.props.friendListCallback();
					}
					this.props.navigator.pop();
				})
				.catch((error) => {
					console.log(error);
				})
				.done();
	}
}

class SubmitFriendButton extends Component {
	render() {
		var TouchableElement = TouchableHighlight;
		return (
				<TouchableElement
						onPress={this.props.onSelect}>
					<Text>Submit New Friend</Text>
				</TouchableElement>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60
	},
	nameInput: {
		flex: 1,
		fontSize: 16,
		margin: 2,
		padding: 8,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1
	},
	row: {
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'row',
		padding: 5
	}
});

module.exports = AddFriendPage;

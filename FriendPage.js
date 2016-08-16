import React, {Component} from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import FriendNoteEditor from './FriendNoteEditor';
import FriendContactIntervalEditor from './FriendContactIntervalEditor';
import {
	friendIdRequestUrl,
	generatePost,
	INTERACTIONS_REQUEST_URL,
} from './Constants';

class FriendPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		var url = friendIdRequestUrl(this.props.friend.id);
		fetch(url)
			.then((response) => response.json())
			.then((responseData) => this.setState({friend: responseData}))
			.done();
	}

	render() {
		var friend = this.state.friend;
		if (!friend) {
			return (
				<View></View>
			);
			// TODO: emily add loading state
		}

		var TouchableElement = TouchableOpacity;

		return (
			<View style={styles.container}>
				<FriendNoteEditor
					note={friend.notes}
					friendId={friend.id} />

				<TouchableElement onPress={this.addInteraction}>
					<Text>Add Interaction</Text>
				</TouchableElement>
				<Text>Number of interactions {friend.interactions.length}</Text>

				<FriendContactIntervalEditor
					contactInterval={friend.contactInterval}
					friendId={friend.id} />
			</View>
		);
	}

	addInteraction = () => {
		var options = generatePost({friendId: this.state.friend.id});
		var url = INTERACTIONS_REQUEST_URL;

		fetch(url, options)
			.then((responseBody) => responseBody.json())
			.then((response) => {
				// TODO: emily do more here
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			})
			.done();
	};
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
		backgroundColor: '#FFF',
	},
	row: {
		flexDirection: 'row',
	},
});

module.exports = FriendPage;

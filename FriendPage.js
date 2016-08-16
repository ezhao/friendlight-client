import React, {Component} from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	Slider,
} from 'react-native';
import FriendNoteEditor from './FriendNoteEditor';
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
				<FriendNoteEditor note={friend.notes} friendId={friend.id} />

				<TouchableElement onPress={this.addInteraction}>
					<Text>Add Interaction</Text>
				</TouchableElement>
				<Text>Number of interactions {friend.interactions.length}</Text>

				<Slider
					minimumValue={1}
					maximumValue={365}
					step={1}
					value={friend.contactInterval}
					onValueChange={(value) => this.setState({contactIntervalSliderValue: value})}
					onSlidingComplete={(value) => this.saveContactInterval(value)}
				/>
				<Text>{this.state.contactIntervalSliderValue}</Text>
				<Text>{this.state.contactInterval || friend.contactInterval}</Text>
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

	saveContactInterval = (value) => {
		//TODO need to show saving/saved state

		this.setState({contactInterval: value})
		var options = generatePost({contactInterval: value});
		var url = friendIdRequestUrl(this.props.friend.id);

		fetch(url, options)
			.then((responseBody) => responseBody.json())
			.then((response) => {
				//TODO
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
});

module.exports = FriendPage;

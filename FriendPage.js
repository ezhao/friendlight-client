import React, {Component} from 'react';
import {
	TouchableHighlight,
	StyleSheet,
	Text,
	TextInput,
	View,
	Animated,
} from 'react-native';
import {friendIdRequestUrl} from './Constants';


class FriendPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_noteSavingAnimatedOpacity: new Animated.Value(0),
		};
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

		// TODO: this is jank for now
		var savingNoteIndicator = {
			opacity: this.state._noteSavingAnimatedOpacity,
		}

		var TouchableElement = TouchableHighlight;
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.note}
					onChangeText={(text) => this.setState({note: text})}
					multiline={true}
					editable = {true}
					value={this.state.note || friend.notes}
					placeholder={"Save a note about your friend"}
				/>
				<TouchableElement onPress={this.saveNote}>
					<Text>Save Note</Text>
				</TouchableElement>
				<Animated.View style={savingNoteIndicator}>
					<Text>{this.state.noteSavingText}</Text>
				</Animated.View>
			</View>
		);
	}

	saveNote = () => {
		this.state._noteSavingAnimatedOpacity.setValue(1);
		this.setState({noteSavingText: "Saving note"});

		var options = {
			method: 'POST',
			headers: {
				'Accept': 'text/plain',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				notes: this.state.note
			})
		};
		var url = friendIdRequestUrl(this.props.friend.id);

		fetch(url, options)
				.then((responseBody) => responseBody.json())
				.then((response) => {
					this.setState({noteSavingText: "Saved!"});
					Animated.timing(this.state._noteSavingAnimatedOpacity, {
							toValue: 0
						}).start();
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
		paddingTop: 60
	},
	note: {
		height: 120,
		fontSize: 14,
		color: '#555',
		padding: 16,
		backgroundColor: '#FFF',
		marginBottom: 2,
		borderBottomColor: '#CCCCCC',
		borderBottomWidth: 1
	},
});

module.exports = FriendPage;

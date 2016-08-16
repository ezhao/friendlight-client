import React, {Component} from 'react';
import {
	TouchableHighlight,
	StyleSheet,
	Text,
	TextInput,
	View,
	Animated,
	Slider,
} from 'react-native';
import {
	friendIdRequestUrl,
	generatePost,
	INTERACTIONS_REQUEST_URL,
} from './Constants';

var SAVING_NOTE = "Saving note";
var SAVING_NOTE_ERROR = "Error saving note";

class FriendPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			_noteSavingAnimated: new Animated.Value(0),
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

		var TouchableElement = TouchableHighlight;

		var noteSavingText = this.getNoteSavingText();
		var savingNoteIndicatorStyle = {color: this.getNoteSavingColor()};

		return (
			<View style={styles.container}>
				<TextInput
					style={styles.note}
					onChangeText={(text) => this.setState({note: text})}
					multiline={true}
					editable = {!this.isSavingNote()}
					value={this.state.note != null ? this.state.note : friend.notes}
					placeholder={"Save a note about your friend"}
				/>
				<Animated.Text style={savingNoteIndicatorStyle}>{noteSavingText}</Animated.Text>
				<TouchableElement onPress={this.saveNote}>
					<Text>Save note</Text>
				</TouchableElement>
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

	getNoteSavingText = () => {
		if (this.state.noteSavingText) {
			return this.state.noteSavingText;
		} else if (this.state.note != null && this.state.friend.notes != this.state.note) {
			return "Unsaved changes";
		} else {
			return "";
		}
	};

	getNoteSavingColor = () => {
		if (this.isSavingNote()) {
			return 'rgba(200, 100, 0, 1)';
		} else if (this.isSavingNoteError()) {
			return 'rgba(200, 0, 0, 1)'
		} else if (this.state.noteSavingText) {
			return this.state._noteSavingAnimated.interpolate({
				inputRange: [0, 1],
				outputRange: ['rgba(0, 200, 0, 0)', 'rgba(0, 200, 0, 1)']
			});
		} else if (this.state.note != null && this.state.friend.notes != this.state.note) {
			return 'rgba(200, 200, 0, 1)';
		} else {
			return 'rgba(0, 0, 0, 1)';
		}
	};

	isSavingNote = () => {
		return this.state.noteSavingText == SAVING_NOTE;
	};

	isSavingNoteError = () => {
		return this.state.noteSavingText == SAVING_NOTE_ERROR;
	};

	saveNote = () => {
		this.state._noteSavingAnimated.setValue(1);
		this.setState({noteSavingText: SAVING_NOTE});

		var newNote = this.state.note;
		var options = generatePost({notes: newNote});
		var url = friendIdRequestUrl(this.props.friend.id);

		fetch(url, options)
			.then((responseBody) => responseBody.json())
			.then((response) => {
				this.state.friend.notes = newNote;
				this.setState({noteSavingText: "Saved!"});
				Animated.timing(this.state._noteSavingAnimated, {
						toValue: 0,
						duration: 2000,
					}).start(() => this.setState({noteSavingText: null}));
			})
			.catch((error) => {
				this.setState({noteSavingText: SAVING_NOTE_ERROR});
			})
			.done();
	};

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

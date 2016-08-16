import React, {Component} from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	TextInput,
	View,
	Animated,
} from 'react-native';
import {
	friendIdRequestUrl,
	generatePost,
} from './Constants';

var SAVING_NOTE = "Saving note";
var SAVING_NOTE_ERROR = "Error saving note";

class FriendNoteEditor extends Component {
  static propTypes = {
		note: React.PropTypes.string.isRequired,
    friendId: React.PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
      lastSavedNote: this.props.note,
			_noteSavingAnimated: new Animated.Value(0),
		};
	}

	render() {
		var TouchableElement = TouchableOpacity;

		var noteSavingText = this.getNoteSavingText();
		var savingNoteIndicatorStyle = {color: this.getNoteSavingColor()};

		return (
      <View>
        <TextInput
          style={styles.note}
          onChangeText={(text) => this.setState({note: text})}
          multiline={true}
          editable = {!this.isSavingNote()}
          value={this.state.note != null ? this.state.note : this.props.note}
          placeholder={"Save a note about your friend"}
        />
        <View style={styles.row}>
          <Animated.Text style={[styles.saveIndicator, savingNoteIndicatorStyle]}>{noteSavingText}</Animated.Text>
          <TouchableElement onPress={this.saveNote}>
            <Text style={styles.saveButton}>Save note</Text>
          </TouchableElement>
        </View>
      </View>
		);
	}

	getNoteSavingText = () => {
		if (this.state.noteSavingText) {
			return this.state.noteSavingText;
		} else if (this.state.note != null && this.state.lastSavedNote != this.state.note) {
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
		} else if (this.state.note != null && this.props.note != this.state.note) {
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

		var newNote = this.state.note || this.props.note;
		var options = generatePost({notes: newNote});
		var url = friendIdRequestUrl(this.props.friendId);

		fetch(url, options)
			.then((responseBody) => responseBody.json())
			.then((response) => this.onSaveSuccess(newNote))
			.catch((error) => this.onSaveError(error))
			.done();
	};

  onSaveSuccess = (newNote) => {
    this.setState({
      lastSavedNote: newNote,
      noteSavingText: "Saved!",
    });
    Animated.timing(this.state._noteSavingAnimated, {
        toValue: 0,
        duration: 2000,
      }).start(() => this.setState({noteSavingText: null}));
  };

  onSaveError = (error) => {
    this.setState({noteSavingText: SAVING_NOTE_ERROR});
  };
}

var styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
	},
	saveIndicator: {
		flex: 1,
		padding: 8,
	},
	saveButton: {
		padding: 8,
		color: '#33AAFF',
		fontWeight: 'bold',
	},
	note: {
		height: 120,
		fontSize: 14,
		color: '#333',
		padding: 16,
		margin: 4,
		borderColor: '#DDD',
		borderWidth: 1
	},
});

module.exports = FriendNoteEditor;

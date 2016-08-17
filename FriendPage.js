import React, {Component} from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import FriendNoteEditor from './FriendNoteEditor';
import FriendContactIntervalEditor from './FriendContactIntervalEditor';
import FriendInteractionEditor from './FriendInteractionEditor';
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
			return (<View></View>);
			// TODO: emily add loading state
		}

		return (
			<View style={styles.container}>
				<FriendNoteEditor
					note={friend.notes}
					friendId={friend.id} />
				<FriendInteractionEditor
					interactions={friend.interactions}
					friendId={friend.id} />
				<FriendContactIntervalEditor
					contactInterval={friend.contactInterval}
					friendId={friend.id} />
			</View>
		);
	}
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

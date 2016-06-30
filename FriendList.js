import React, {Component} from 'react';
import {
		AppRegistry,
		Image,
		TouchableHighlight,
		StyleSheet,
		Text,
		ListView,
		View
} from 'react-native';

var REQUEST_URL = 'https://friendlight.herokuapp.com/api/friends';

var FRIEND_PAGE_INDEX = 1; // TODO emily learn js and make this a public static var shared across files SIGH
var ADD_FRIEND_INDEX = 2;

class FriendList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			loaded: false
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch(REQUEST_URL)
				.then((response) => response.json())
				.then((responseData) => {
					this.setState({
						dataSource: this.state.dataSource.cloneWithRows(responseData),
						loaded: true,
					})
				})
				.done();
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}

		return (
				<View style={styles.allContainer}>
					<ListView
							dataSource={this.state.dataSource}
							renderRow={this.renderFriend}
							style={styles.listView}/>
					<AddFriendButton onSelect={this.goToAddFriend} />
				</View>
		);
	}

	renderLoadingView() {
		return (
				<View style={styles.container}>
					<Text>Loading friends...</Text>
				</View>
		);
	}

	renderFriend = (friend) => {
		return (
				<TouchableHighlight onPress={() => this.selectFriend(friend)}>
					<View style={styles.container}>
						<Text style={styles.name}>{friend.name}</Text>
					</View>
				</TouchableHighlight>
		);
	};

	selectFriend = (friend) => {
		this.props.navigator.push({
			name: friend.name,
			index: FRIEND_PAGE_INDEX,
			passProps: {friend: friend}
		});
	};

	goToAddFriend = () => {
		this.props.navigator.push({
			name: "Add Friend",
			index: ADD_FRIEND_INDEX
		});
	};
}

class AddFriendButton extends Component {
	render() {
		return (
				<TouchableHighlight onPress={this.props.onSelect}>
					<Image
							source={{uri: "https://image.freepik.com/free-icon/plus-button_318-123906.jpg"}}
							style={styles.plusImage}/>
				</TouchableHighlight>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	name: {
		fontSize: 20,
		marginBottom: 8,
		textAlign: 'center'
	},
	listView: {
		paddingTop: 60,
		backgroundColor: '#F5FCFF'
	},
	plusImage: {
		width: 64,
		height: 64
	}
});

module.exports = FriendList;

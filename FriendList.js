import React, {Component} from 'react';
import {
		AppRegistry,
		ScrollView,
		Image,
		TouchableHighlight,
		StyleSheet,
		Text,
		ListView,
		View
} from 'react-native';
import FriendListItem from './FriendListItem';
import {
	REQUEST_URL,
	FRIEND_PAGE_INDEX,
	ADD_FRIEND_INDEX
} from './Constants';

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
				<ScrollView
					ref={(component) => this._scrollView = component}>
					<ListView
						ref={(component) => this._listView = component}
						dataSource={this.state.dataSource}
						renderRow={this.renderFriend}
						style={styles.friendListView}/>
					<AddFriendButton onSelect={this.goToAddFriend} />
				</ScrollView>
		);
	}

	renderLoadingView() {
		return (
				<View style={styles.loadingContainer}>
					<Text>Loading friends...</Text>
				</View>
		);
	}

	renderFriend = (friend) => {
		return (
				<FriendListItem
						onSelect={this.selectFriend}
						setParentScrollState={this.setScrollState}
						friend={friend} />
		);
	};

	selectFriend = (friend) => {
		this.props.navigator.push({
			name: friend.name,
			index: FRIEND_PAGE_INDEX,
			passProps: {friend: friend}
		});
	};

	setScrollState = (scrollState) => {
		this._scrollView.setNativeProps({scrollEnabled: scrollState});
		this._listView.setNativeProps({scrollEnabled: scrollState});
	};

	goToAddFriend = () => {
		this.props.navigator.push({
			name: "Add Friend",
			index: ADD_FRIEND_INDEX,
			passProps: {friendListCallback: this.updateList}
		});
	};

	updateList = () => {
		this.fetchData();
	}
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
	loadingContainer: {
		marginTop: 64,
		flex: 1,
		flexDirection: 'row'
	},
	friendListView: {
		marginTop: 64,
		backgroundColor: '#FFF',
		borderTopWidth: 1,
		borderColor: '#EEE'
	},
	plusImage: {
		width: 32,
		height: 32
	}
});

module.exports = FriendList;

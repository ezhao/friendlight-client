import React, {Component} from 'react';
import {
		Navigator,
		View,
		AppRegistry,
		StyleSheet,
		TouchableOpacity,
		Text
} from 'react-native';
import FriendList from './FriendList';
import FriendPage from './FriendPage';
import AddFriendPage from './AddFriendPage';
import {
	FRIEND_LIST_INDEX,
	FRIEND_PAGE_INDEX,
	ADD_FRIEND_INDEX
} from './Constants';

class Index extends Component {
	render() {
		return (
				<Navigator
						style={styles.container}
						initialRoute={{name: 'Friend List', index: FRIEND_LIST_INDEX}}
						renderScene={this._renderScene}
						navigationBar={
		          <Navigator.NavigationBar
		            routeMapper={this._navBarRouteMapper}
		          />
		        }
				/>
		);
	}

	_renderScene(route, navigator) {
		switch (route.index) {
			case FRIEND_PAGE_INDEX:
				return (
					<FriendPage friend={route.passProps.friend}/>
				)
			case ADD_FRIEND_INDEX:
				return (
					<AddFriendPage
						navigator={navigator}
						friendListCallback={route.passProps.friendListCallback}/>
				)
			case FRIEND_LIST_INDEX:
			default:
				return (
					<FriendList navigator={navigator} />
				)
		}
	}

	componentWillMount = () => {
		this._navBarRouteMapper = {
			Title: function(route, navigator, index, navState) {
				return (
						<View style={styles.navNameContainer}>
							<Text>{route.name}</Text>
						</View>
				);
			},
			LeftButton: function(route, navigator, index, navState) {
				if (index == FRIEND_LIST_INDEX) { //TODO(emily) check stacksize instead
					return null;
				}
				return (
						<TouchableOpacity
								style={styles.crumbIconPlaceholder}
								onPress={() => { navigator.pop(); }}>
							<Text>Back</Text>
						</TouchableOpacity>
				);
			},
			RightButton: function(route, navigator, index, navState) {
				return null;
			},
		};
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FCFCF2',
	},
	navNameContainer: {
		flex: 1,
		flexDirection:'row',
		alignItems: 'center',
	},
	crumbIconPlaceholder: {
		flex: 1,
		flexDirection:'row',
		alignItems: 'center',
		padding: 8,
	},
});

AppRegistry.registerComponent('SampleAppMovies', () => Index);

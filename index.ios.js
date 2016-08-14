import React, {Component} from 'react';
import {
		Navigator,
		View,
		AppRegistry,
		StyleSheet,
		TouchableOpacity,
		Text
} from 'react-native';
var FriendList = require('./FriendList');
var FriendPage = require('./FriendPage');
var AddFriendPage = require('./AddFriendPage');

var FRIEND_LIST_INDEX = 0;
var FRIEND_PAGE_INDEX = 1;
var ADD_FRIEND_INDEX = 2;

class Index extends Component {
	render() {
		return (
				<Navigator
						style={styles.container}
						initialRoute={{name: 'Friend List', index: FRIEND_LIST_INDEX}}
						renderScene={this._renderScene}
						navigationBar={
		          <Navigator.BreadcrumbNavigationBar
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
						<AddFriendPage navigator={navigator} friendListCallback={route.passProps.friendListCallback} />
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
			rightContentForRoute: function(route, navigator) {
				return null;
			},
			titleContentForRoute: function(route, navigator) {
				return (
						<View style={styles.navNameContainer}>
							<Text>{route.name}</Text>
						</View>
				);
			},
			iconForRoute: function(route, navigator) {
				return (
						<TouchableOpacity
								onPress={() => { navigator.popToRoute(route); }}
								style={styles.crumbIconPlaceholder}
						/>
				);
			},
			separatorForRoute: function(route, navigator) {
				return (
						<TouchableOpacity
								onPress={navigator.pop}
								style={styles.crumbSeparatorPlaceholder}
						/>
				);
			}
		};
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},
	navNameContainer: {
		flex: 1,
		height: 64
	},
	crumbIconPlaceholder: {
		flex: 1,
		backgroundColor: '#555555'
	},
	crumbSeparatorPlaceholder: {
		flex: 1,
		backgroundColor: '#aaaaaa',
	}
});

AppRegistry.registerComponent('SampleAppMovies', () => Index);

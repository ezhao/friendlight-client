import React, {Component} from 'react';
import {
  StackNavigator,
} from 'react-navigation';
import FriendList from './FriendList';
import FriendPage from './FriendPage';
import AddFriendPage from './AddFriendPage';

const AppNavigator = StackNavigator({
  FriendList: { screen: FriendList },
	FriendPage: { screen: FriendPage },
	AddFriendPage: { screen: AddFriendPage },
});

export default class App extends React.Component {
	render() {
		return (
				<AppNavigator ref={nav => { this.navigator = nav; }} />
		);
	}
}

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  generatePost,
  INTERACTIONS_REQUEST_URL,
} from './Constants';

class FriendInteractionEditor extends Component {
  static propTypes = {
    interactions: React.PropTypes.array.isRequired,
    friendId: React.PropTypes.number.isRequired,
  };

  render = () => {
    var TouchableElement = TouchableOpacity;
    return (
      <View>
        <TouchableElement onPress={this.addInteraction}>
          <Text>Add Interaction</Text>
        </TouchableElement>
        <Text>Number of interactions {this.props.interactions.length}</Text>
      </View>
    );
  };

  addInteraction = () => {
    var options = generatePost({friendId: this.props.friendId});
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
}

module.exports = FriendInteractionEditor;

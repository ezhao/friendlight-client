import moment from 'moment';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  generatePost,
  INTERACTIONS_REQUEST_URL,
} from './Constants';

class FriendInteractionEditor extends Component {
  static propTypes = {
    interactions: React.PropTypes.array,
    friendId: React.PropTypes.number.isRequired,
  };

  render = () => {
    var TouchableElement = TouchableOpacity;
    var addButtonColor = {color: '#A00'};
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.titleText}>Interactions</Text>
          <TouchableElement onPress={this.addInteraction}>
            <Animated.Text style={[styles.addButton, addButtonColor]}>
              Add
            </Animated.Text>
          </TouchableElement>
        </View>
        <ListOfFriendInteractions interactions={this.props.interactions} />
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

class ListOfFriendInteractions extends Component {
  static propTypes = {
    interactions: React.PropTypes.array,
  };

  render = () => {
    return (
      <View>
        {this.props.interactions.map((interaction) => {
          return (
            <FriendInteraction key={interaction.id} interaction={interaction} />
          );
        })}
      </View>
    );
  };
}

class FriendInteraction extends Component {
  static propTypes = {
    interaction: React.PropTypes.object.isRequired,
  };

  render = () => {
    var interaction = this.props.interaction;
    var timeOfInteraction = new moment(new Date(interaction.createdAt));
    return (
      <Text>
        {timeOfInteraction.format("MMMM Do, YYYY h:mma")}
      </Text>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  titleText: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
  },
});

module.exports = FriendInteractionEditor;

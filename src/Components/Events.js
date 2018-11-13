import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text } from 'react-native';

class Events extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Заходи',
    tabBarIcon: () => (<Icon size={24} color="white" name="place" />)
  }

  render() {
    return (<View><Text>Заходи</Text></View>);
  }
}

module.exports = Events;
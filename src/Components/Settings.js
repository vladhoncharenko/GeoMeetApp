import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text } from 'react-native';

class Settings extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Налаштування',
    tabBarIcon: () => (<Icon size={24} color="white" name="settings" />)
  }

  render() {
    return (<View><Text>Налаштування</Text></View>);
  }
}

module.exports = Settings;
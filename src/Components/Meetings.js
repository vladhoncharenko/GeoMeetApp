import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text } from 'react-native';

class Meetings extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Знайомства',
    tabBarIcon: () => (<Icon size={24} color="white" name="people" />)
  }

  render() {
    return (<View><Text>Знайомства</Text></View>);
  }
}

module.exports = Meetings;
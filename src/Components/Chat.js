import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text } from 'react-native';

class Chat extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Чат',
        tabBarIcon: () => (<Icon size={24} color="white" name="chat" />)
    }

    render() {
        return (<View><Text>Чат</Text></View>);
    }
}

module.exports = Chat;
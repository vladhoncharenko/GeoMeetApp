import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, AsyncStorage } from 'react-native';
import Radar from 'react-native-radar';

class Chat extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Чат',
        tabBarIcon: () => (<Icon size={24} color="white" name="chat" />)
    }

    async componentDidMount() {
        let isRadarInit = await AsyncStorage.getItem('isRadarInit');
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        isRadarInit = isRadarInit === null ? false : true;
        if (!isRadarInit) {
            Radar.setUserId(user.id);
            Radar.setPlacesProvider('none');
            Radar.startTracking();
            AsyncStorage.setItem('isRadarInit', JSON.stringify(true));
        }
        Radar.trackOnce().then().catch((err) => {
            console.log("TrackOnce error:", err);
        });
    }

    render() {
        return (<View><Text>Чат</Text></View>);
    }
}

module.exports = Chat;
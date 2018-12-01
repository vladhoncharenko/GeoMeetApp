import React from 'react'
import { View, Text, AsyncStorage, StyleSheet, ScrollView } from 'react-native';
import Radar from 'react-native-radar';
import { createStackNavigator, StackActions, NavigationActions, HeaderBackButton } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import getCurrentUser from "../chatUtils";
let PrivateChat = require('./PrivateChat');

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms: [],
            isLoading: true
        };
    };

    async componentDidMount() {
        let userId = await AsyncStorage.getItem('userId');
        this.currentUser = await getCurrentUser();

        this._sub = this.props.navigation.addListener('didFocus', async () =>
            await this.updateData()
        );
        await this.updateData();

        let isRadarInit = await AsyncStorage.getItem('isRadarInit');
        isRadarInit = isRadarInit === null ? false : true;

        if (!isRadarInit) {
            Radar.setUserId(userId);
            Radar.setPlacesProvider('facebook');
            Radar.startTracking();
            AsyncStorage.setItem('isRadarInit', JSON.stringify(true));
        }

        Radar.trackOnce().then((res) => {
            console.log("TrackOnce result:", res);
        }).catch((err) => {
            console.log("TrackOnce error:", err);
        });
    };

    async updateData() {
        for (let index = 0; index < this.currentUser.rooms.length; index++) {
            this.currentUser.rooms[index];

            let cursor = this.currentUser.readCursor({
                roomId: this.currentUser.rooms[index].id
            })

            if (cursor) {
                let messages = await this.currentUser.fetchMessages({
                    roomId: this.currentUser.rooms[index].id,
                    limit: 1,
                    direction: 'older',
                });
                if (messages[0].id > cursor.position) {
                    this.currentUser.rooms[index].unreadMsgs = true;
                } else {
                    this.currentUser.rooms[index].unreadMsgs = false;
                }
            }
        }
        this.setState({ rooms: this.currentUser.rooms, isLoading: false });
    };

    onRoomPress(roomId, roomName) {
        console.log(roomId, roomName)
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'PrivateChat', params: { roomId: roomId, currentUser: this.currentUser, userId: this.currentUser.id, roomName: roomName } })
            ],
        }));
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    {!this.state.isLoading &&
                        <View>
                            {this.state.rooms.length !== 0 ?
                                <View >
                                    <Text style={[styles.promt]}>Ваші чати:</Text>
                                    {
                                        this.state.rooms.map((item) => (
                                            <ListItem
                                                title={<Text>{item.name}</Text>}
                                                key={item.id}
                                                containerStyle={styles.chatItem}
                                                onPress={() => this.onRoomPress(item.id, item.name)}
                                                badge={item.unreadMsgs ? { value: "", textStyle: { color: 'orange' }, containerStyle: { color: 'red', marginTop: -20 } } : null}
                                            />
                                        ))
                                    }
                                </View> : <Text>У вас ще немає діалогів</Text>}
                        </View>}
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBE6'
    },
    promt: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    scrollView: {
        marginLeft: 10,
        marginRight: 10
    },
    chatItem: {
        marginBottom: 5,
        backgroundColor: '#B9E4C9'
    }
});

module.exports = createStackNavigator(
    {
        Chat: {
            screen: Chat,
            navigationOptions: {
                header: null,
                tabBarLabel: 'Чат',
            }
        },
        PrivateChat: {
            screen: PrivateChat,
            navigationOptions: ({ navigation }) => ({
                title: navigation.state.params.title,
                headerLeft: (<HeaderBackButton onPress={() => navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Chat' })
                    ],
                }))} />)
            }),
        },
    },
    {
        initialRouteName: 'Chat',
    }
);
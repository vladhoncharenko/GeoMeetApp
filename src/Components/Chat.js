import React from 'react'
import { View, Text, AsyncStorage, StyleSheet, ScrollView } from 'react-native';
import Radar from 'react-native-radar';
import { createStackNavigator, StackActions, NavigationActions, HeaderBackButton } from 'react-navigation';
let PrivateChat = require('./PrivateChat');
import { ListItem } from 'react-native-elements';
import Chatkit from "@pusher/chatkit-client/react-native";

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "";
const CHATKIT_INSTANCE_LOCATOR = "";

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
        userId = "test"
        const tokenProvider = new Chatkit.TokenProvider({
            url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
        });

        this.chatManager = new Chatkit.ChatManager({
            instanceLocator: CHATKIT_INSTANCE_LOCATOR,
            userId: userId,
            tokenProvider: tokenProvider
        });

        this._sub = this.props.navigation.addListener('didFocus', async () =>
            await this.updateData()
        );
        await this.updateData();

        let isRadarInit = await AsyncStorage.getItem('isRadarInit');
        isRadarInit = isRadarInit === null ? false : true;
        console.log("User:", userId);
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
    let currentUser = await this.chatManager.connect();
    this.currentUser= currentUser;
        
       
            for (let index = 0; index < currentUser.rooms.length; index++) {
                currentUser.rooms[index];

                let cursor = currentUser.readCursor({
                    roomId: currentUser.rooms[index].id
                })
                
                if (cursor) {
                    let messages = await currentUser.fetchMessages({
                            roomId: currentUser.rooms[index].id,
                            limit: 1,
                            direction: 'older',
                        });
                        if (messages[0].id > cursor.position) {
                            currentUser.rooms[index].unreadMsgs = true;
                                    
                                } else {
                                    currentUser.rooms[index].unreadMsgs =false;
                                    
                                }
                   
                }
            }
            
            this.setState({ rooms: currentUser.rooms, isLoading: false });
        
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
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginLeft: 30, marginRight: 30 }}>
                    {!this.state.isLoading &&
                        <View >
                            {
                                this.state.rooms.map((item, index) => (
                                    <ListItem
                                        title={<Text>{item.name}</Text>}
                                        key={item.id}
                                        containerStyle={{ marginBottom: 5, backgroundColor: '#B9E4C9' }}
                                        onPress={() => this.onRoomPress(item.id, item.name)}
                                        badge={item.unreadMsgs?{ value: "", textStyle: { color: 'orange' }, containerStyle: {color: 'red', marginTop: -20 } }:null}
                                    />
                                ))
                            }
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
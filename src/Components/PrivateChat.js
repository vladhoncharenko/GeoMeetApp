import React from 'react'
import { View, Text } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

class PrivateChat extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.navigation.state.params)
        this.currentUser = this.props.navigation.state.params.currentUser;
        this.roomId = this.props.navigation.state.params.roomId;
        this.props.navigation.setParams({ title: this.props.navigation.state.params.roomName });

        this.state = {
            messages: [],

        };
    }
    async componentWillUnmount() {
        console.log("unmount")
        let d = this.state.messages;
        this.currentUser.setReadCursor({
            roomId: this.roomId,
            position: this.state.messages[0]._id
        })
            .then(() => {
                console.log('Success!')
            })
            .catch(err => {
                console.log(`Error setting cursor: ${err}`)
            })
    }
    async componentDidMount() {
        this.currentUser.fetchMessages({
            roomId: this.roomId,
            direction: 'newer',
            limit: 100,
        })
            .then(messages => {
                let msgs = [];
                messages.forEach(element => {
                    msgs.push({
                        _id: element.id,
                        text: element.text,
                        createdAt: element.createdAt,
                        user: {
                            _id: element.sender.id,
                            name: element.sender.name,
                            avatar: element.sender.avatarURL,
                        }
                    });
                });
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, msgs.reverse())
                }));
            })
            .catch(err => {
                console.log(`Error fetching messages: ${err}`)
            })

        this.currentUser.subscribeToRoom({
            roomId: this.roomId,
            hooks: {
                onMessage: this.onReceive.bind(this)
            },
            messageLimit: 0
        });
    };

    onReceive(data) {
        const { id, senderId, text, createdAt } = data;
        const incomingMessage = {
            _id: id,
            text: text,
            createdAt: new Date(createdAt),
            user: {
                _id: senderId,
                name: data.sender.name,
                avatar: data.sender.avatarURL
            }
        };

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, incomingMessage)
        }));
    };

    onSend([message]) {
        this.currentUser.sendMessage({
            text: message.text,
            roomId: this.roomId
        });
    };

    renderBubble(props) {
        if ((props.isSameUser(props.currentMessage, props.previousMessage) && props.isSameDay(props.currentMessage, props.previousMessage)) || props.currentMessage.user._id === this.user._id) {
            return (
                <Bubble
                    {...props}
                />
            );
        }
        return (
            <View>
                <Text>{props.currentMessage.user.name}</Text>
                <Bubble
                    {...props}
                />
            </View>
        );
    };

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: this.props.navigation.state.params.userId
                }}
                renderBubble={this.renderBubble}
            />
        );
    }
}

module.exports = PrivateChat;
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/SliderEntry.style';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RkText } from 'react-native-ui-kitten';
import getCurrentUser from "../chatUtils";
import { StackActions, NavigationActions } from 'react-navigation';

export default class SliderEntry extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };
    constructor(props) {
        super(props);
        this._onStarPress = e => {
            console.log(e)
        };
    };
    async _onContactPress(name, creatorId) {
        let currentUser = await getCurrentUser();
        let roomName = 'Admin - ' + name;
        let createdRoom = currentUser.rooms.filter((room) => room.name === roomName);
        let roomId = "";
        if (createdRoom.length === 0) {
            let room = await currentUser.createRoom({
                name: roomName,
                private: true,
                addUserIds: [creatorId]
            });
            roomId = room.id;
        } else {
            roomId = createdRoom[0].id;
        }
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'PrivateChat', params: { roomId: roomId, currentUser: currentUser, userId: currentUser.id, roomName: roomName } })
            ],
        }));
    };

    render() {
        const { data: { id, name, date, address, description, creatorId } } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}>
                <View rkCardHeader={true}>
                    <View>
                        <RkText rkType='header' style={styles.name}>{name}</RkText>
                        <RkText rkType='subtitle' style={styles.date}>{date}</RkText>
                        <RkText rkType='subtitle' style={styles.address}>{address}</RkText>
                    </View>
                </View>
                <View rkCardContent={true} style={{ paddingTop: 0 }}>
                    <RkText rkType='compactCardText' style={styles.description}>{description}</RkText>
                </View>
                <View rkCardFooter={true} style={{
                    flex: 1, alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={styles.footerButtons}>
                        <Icon size={35} color="#356859" name="star" style={styles.margin} onPress={() => this._onStarPress(id)} />
                        <Icon size={35} color="#356859" name="share" style={styles.margin} onPress={() => this._onStarPress(creatorId)} />
                        <Icon size={35} color="#356859" name="forum" onPress={() => this._onContactPress(name, creatorId)} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
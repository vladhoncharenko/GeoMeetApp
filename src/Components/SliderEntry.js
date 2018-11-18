
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import Icon from 'react-native-vector-icons/Feather'

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

        this._onContactPress = e => {
            console.log(e)
        };
    }
    render() {
        const { data: { id, name, date, address, description, creatorId }, even } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}>
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    <Text>{name}</Text>
                    <Text>{date}</Text>
                    <Text>{address}</Text>
                    <Text>{description}</Text>
                    <Icon size={35} color="white" name="star" onPress={() => this._onStarPress(id)} />
                    <Icon size={35} color="white" name="message-square" onPress={() => this._onContactPress(creatorId)} />
                </View>
            </TouchableOpacity>
        );
    }
}
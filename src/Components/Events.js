import React, { Component } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions, Text } from "react-native";
import MapView from "react-native-maps";
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from '../styles/Events.style';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { BASE_URL } from '../consts';

const axios = require('axios');
let CreateEvent = require('./CreateEvent.js');
const { width, height } = Dimensions.get("window");
const SLIDER_1_FIRST_ITEM = 0;
const LATITUD_DELTA = 0.025;
const LONGITUDE_DELTA = LATITUD_DELTA * (width / height);
const NAVIGATION_TIME = 222;

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };

    this._onMarkerPress = e => {
      const coordinate = e.nativeEvent.coordinate;
      const marker = this.state.markers.find(
        m => m.coordinate.latitude == coordinate.latitude && m.coordinate.longitude == coordinate.longitude
      );
      if (marker) {
        let index = this.state.markers.indexOf(marker);
        this._slider1Ref.snapToItem(index, animated = true, fireCallback = true);
      }
    };

    this._renderItemWithParallax = ({ item, index }) => {
      return (
        <SliderEntry
          data={item}
          even={(index + 1) % 2 === 0}
        />
      );
    };
  }

  navigateToRegion(coordinates, time) {
    let region = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    this.map.animateToRegion(region, time);
  };

  onSnapToItem(index) {
    this.setState({ slider1ActiveSlide: index });
    this.navigateToRegion(this.parseCoords(this.state.markers[index].coordinate), NAVIGATION_TIME);
  };

  createEvent() {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'CreateEvent' })
      ],
    }));
  };

  componentDidMount() {
    axios.get(BASE_URL + "/geofences").then((events) => {

      this.state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        markers: events.data,
        isLoading: false
      };

      this.defaultRegion = {
        latitude: parseFloat(this.state.markers[0].coordinate.latitude),
        longitude: parseFloat(this.state.markers[0].coordinate.longitude),
        latitudeDelta: LATITUD_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      this.setState(this.state)
    });
  };

  parseCoords(coords) {
    return {
      longitude: parseFloat(coords.longitude),
      latitude: parseFloat(coords.latitude)
    };
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.isLoading ?
          <View style={styles.container}>
            <MapView
              ref={map => this.map = map}
              initialRegion={this.defaultRegion}
              style={styles.container}>
              {this.state.markers.map((marker, index) => {
                return (
                  <View key={index + marker.id}>
                    <MapView.Circle key={index} center={this.parseCoords(marker.coordinate)} radius={parseFloat(marker.radius)} strokeColor={"rgba(233,3,45,0.5)"} fillColor={"rgba(134,33,44,0.4)"} />
                    <MapView.Marker coordinate={this.parseCoords(marker.coordinate)} key={marker.id} onPress={this._onMarkerPress}></MapView.Marker>
                  </View>
                );
              })}
            </MapView>
            <View style={styles.exampleContainer}>
              <Carousel
                ref={c => this._slider1Ref = c}
                data={this.state.markers}
                renderItem={this._renderItemWithParallax}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop={false}
                loopClonesPerSide={2}
                autoplay={false}
                onSnapToItem={(index) => this.onSnapToItem(index)}
              />
            </View>
            <Icon
              name='chat'
              size={35}
              onPress={() => this.createEvent()}
              style={styles.createEventBtn}
              color='white' />
          </View>
          : <Text>Завантаження...</Text>}
      </View>
    );
  }
}

module.exports = createStackNavigator(
  {
    Events: {
      screen: Events,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Заходи',
      }
    },
    CreateEvent: {
      screen: CreateEvent,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: 'Events',
  }
);
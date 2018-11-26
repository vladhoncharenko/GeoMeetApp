import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions, Text, AsyncStorage } from "react-native";
import MapView from "react-native-maps";
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from '../styles/Events.style';
import { createStackNavigator, StackActions, NavigationActions,HeaderBackButton } from 'react-navigation';
import { BASE_URL } from '../consts';
let PrivateChat = require('./PrivateChat');

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
      isLoading: true,
      noResults: true
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
          navigation={this.props.navigation}
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

  async componentDidMount() {
    this._sub = this.props.navigation.addListener('didFocus', async () =>
      await this.updateData()
    );
    await this.updateData();
  };

  async updateData() {
    let auth_token = await AsyncStorage.getItem('auth_token');
      let config = {
        headers: {'x-amz-security-token':  auth_token}
      };
    axios.get(BASE_URL + "/geofences", config).then((events) => {

      this.state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        markers: events.data,
        isLoading: false,
        noResults: events.data.length ===0
      };
      if(!this.state.noResults){
        this.defaultRegion = {
          latitude: parseFloat(this.state.markers[0].coordinate.latitude),
          longitude: parseFloat(this.state.markers[0].coordinate.longitude),
          latitudeDelta: LATITUD_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
      }
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
            {this.state.noResults ? <Text>Додайте перший захід: <Icon
              name='plus-circle'
              size={35}
              onPress={() => this.createEvent()}
              style={styles.createEventBtn}
              color='white' />
            </Text> : <View style={styles.container}>
                <MapView
                  ref={map => this.map = map}
                  initialRegion={this.defaultRegion}
                  style={styles.container}>
                  {this.state.markers.map((marker, index) => {
                    return (
                      <View key={index + marker.id}>
                        <MapView.Circle key={index} center={this.parseCoords(marker.coordinate)} radius={parseFloat(marker.radius)} strokeColor={"rgba(253, 85, 35, 0.45)"} fillColor={"rgba(255, 251, 230, 0.5)"} />
                        <MapView.Marker coordinate={this.parseCoords(marker.coordinate)} key={marker.id} onPress={this._onMarkerPress} pinColor='#FD5523'></MapView.Marker>
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
                  name='plus-circle'
                  size={35}
                  onPress={() => this.createEvent()}
                  style={styles.createEventBtn}
                  color='#356859' />
              </View>}
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
    PrivateChat: {
      screen: PrivateChat,
      navigationOptions: ({ navigation }) => ({
          title: navigation.state.params.title,
          headerLeft: (<HeaderBackButton onPress={() => navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                  NavigationActions.navigate({ routeName: 'Events' })
              ],
          }))} />)
      }),
  },
  },
  {
    initialRouteName: 'Events',
  }
);
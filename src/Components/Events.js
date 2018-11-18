import React, { Component } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from '../styles/Events.style';

const { width, height } = Dimensions.get("window");

const SLIDER_1_FIRST_ITEM = 0;
const LATITUD_DELTA = 0.025;
const LONGITUDE_DELTA = LATITUD_DELTA * (width / height);
const NAVIGATION_TIME = 222;

class Events extends Component {
  static navigationOptions = {
    tabBarLabel: 'Заходи',
    tabBarIcon: () => (<Icon size={24} color="white" name="place" />)
  }

  constructor(props) {
    super(props);

    this._onMarkerPress = e => {
      const coordinate = e.nativeEvent.coordinate;
      const marker = this.state.markers.find(
        m => m.coordinate.latitude === coordinate.latitude && m.coordinate.longitude === coordinate.longitude
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

    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      markers: [
        {
          id: 1,
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          title: "Best Place",
          subtitle: "This is the best place in Portland",
          illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
        },
        {
          id: 2,
          coordinate: {
            latitude: 45.524678,
            longitude: -122.6655507,
          },
          title: "Second Best Place",
          subtitle: "This is the second best place in Portland",
          illustration: 'https://i.imgur.com/MABUbpDl.jpg',
        }
      ]
    };
    this.defaultRegion = {
      latitude: this.state.markers[0].coordinate.latitude,
      longitude: this.state.markers[0].coordinate.longitude,
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA
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
  }

  onSnapToItem(index) {
    this.setState({ slider1ActiveSlide: index });
    this.navigateToRegion(this.state.markers[index].coordinate, NAVIGATION_TIME);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.defaultRegion}
          style={styles.container}>
          {this.state.markers.map((marker, index) => {
            return (
              <View>
                <MapView.Circle key={index} center={marker.coordinate} radius={50} strokeColor={"rgba(233,3,45,0.5)"} fillColor={"rgba(134,33,44,0.4)"} />
                <MapView.Marker coordinate={marker.coordinate} key={marker.id} onPress={this._onMarkerPress}></MapView.Marker>
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
      </View>
    );
  }
}

module.exports = Events;
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from '../styles/Events.style';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
let CreateEvent = require('./CreateEvent.js');

const { width, height } = Dimensions.get("window");

const SLIDER_1_FIRST_ITEM = 0;
const LATITUD_DELTA = 0.025;
const LONGITUDE_DELTA = LATITUD_DELTA * (width / height);
const NAVIGATION_TIME = 222;

class Events extends Component {
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
          creatorId: 11,
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          radius: 50,
          date: "11.12 12:00 - 11.12 15:00",
          address: "пер. ім. лік З. Красовицького 9/33",
          name: "Data Sciene Meet Up",
          description: "Прихильники такого використання пропонують використовувати слово з малої літери для вікі-сайтів загалом. Слово «вікі» походить з гавайської мови й означає «хуткий» або «швидкий»."
        },
        {
          id: 2,
          creatorId: 22,
          coordinate: {
            latitude: 45.524678,
            longitude: -122.6655507,
          },
          radius: 70,
          date: "11.12 9:00 - 11.12 22:30",
          address: "Петропавлівська 99",
          name: "Переклад творів Тараса Шевченка на англійську мову дуже швидко.",
          description: "За словами самого Канінгема, «Я обрав термін „вікі-вікі“, щоб замінити надто хутку думку назвати цю штуку хуткою мережею.»"
        },
        {
          id: 3,
          creatorId: 33,
          coordinate: {
            latitude: 45.524148,
            longitude: -122.6747817,
          },
          radius: 50,
          date: "15.12 10:00 - 16.12 17:00",
          address: "Харківська 1",
          name: "Наявність дуже простого для опанування редактора тексту.",
          description: "Насамперед Вікія. У Вікіпедії є окрема стаття про цей хостинг."
        },
        {
          id: 4,
          creatorId: 44,
          coordinate: {
            latitude: 45.529678,
            longitude: -122.6656507,
          },
          radius: 70,
          date: "09.12 10:00 - 12.12 14:30",
          address: "Римського-Корсакова 1/2",
          name: "Можливість багаторазово редагувати текст.",
          description: "Відкрита філософія більшості вікі — дозволяти будь-кому змінювати вміст — не гарантує, що наміри таких редакторів завжди добрі"
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

  createEvent() {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'CreateEvent' })
      ],
    }));
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
                <MapView.Circle key={index} center={marker.coordinate} radius={marker.radius} strokeColor={"rgba(233,3,45,0.5)"} fillColor={"rgba(134,33,44,0.4)"} />
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
        <Icon
          name='chat'
          size={35}
          onPress={() => this.createEvent()}
          style={styles.createEventBtn}
          color='white' />
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
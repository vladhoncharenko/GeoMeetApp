
import { NavigationComponent } from 'react-native-material-bottom-navigation-performance'
import { TabNavigator } from 'react-navigation'
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons'
let Chat = require('./Chat.js');
let Events = require('./Events');
let Meetings = require('./Meetings');
let Settings = require('./Settings');

const Main = TabNavigator({
  Events: { screen: Events },
  Chat: { screen: Chat },
  Meetings: { screen: Meetings },
  Settings: { screen: Settings }
},
  {
    initialRouteName: "Chat",
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      bottomNavigationOptions: {
        activeTab: 2,
        labelColor: 'white',
        rippleColor: 'white',
        tabs: {
          Events: {
            barBackgroundColor: '#37474F',
            icon: <Icon size={24} color="white" name="place" />,
            label: 'Заходи'
          },
          Chat: {
            icon: <Icon size={24} color="white" name="chat" />,
            label: 'Чат',
            barBackgroundColor: '#00796B'
          },
          Meetings: {
            label: 'Знайомства',
            icon: <Icon size={24} color="white" name="people" />,
            barBackgroundColor: '#B71C1C',
          },
          Settings: {
            barBackgroundColor: '#1B5E20'
          }
        }
      }
    }
  })

module.exports = Main;
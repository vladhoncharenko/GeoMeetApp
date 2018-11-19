
import { NavigationComponent } from 'react-native-material-bottom-navigation-performance'
import { TabNavigator } from 'react-navigation'
let Chat = require('./Chat.js');
let Events = require('./Events');
let Meetings = require('./Meetings');
let Settings = require('./Settings');
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons'

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
            barBackgroundColor: '#00796B'
          },
          Meetings: {
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
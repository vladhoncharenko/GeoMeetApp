
import { NavigationComponent } from 'react-native-material-bottom-navigation-performance'
import { TabNavigator } from 'react-navigation'
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
            barBackgroundColor: '#37474F'
          },
          Chat: {
            barBackgroundColor: '#00796B'
          },
          Meetings: {
            barBackgroundColor: '#B71C1C'
          },
          Settings: {
            barBackgroundColor: '#1B5E20'
          }
        }
      }
    }
  })

module.exports = Main;
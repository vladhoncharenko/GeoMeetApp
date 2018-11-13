import React, { Component } from 'react';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { OnFBLogin, OnFBLoginFound } from './src/FBLoginHandler.js';
import { AsyncStorage, View, Text } from "react-native";
let FBLoginView = require('./src/FBLoginView.js');
let GreetingsView = require('./src/GreetingsView.js');
let MainView = require('./src/MainView.js');

export default class App extends Component {

  state = {
    loaded: false
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async componentDidMount() {
    isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    isLoggedIn = isLoggedIn === null ? false : true;
    isTutorialCompleted = await AsyncStorage.getItem('isTutorialCompleted');
    isTutorialCompleted = isTutorialCompleted === null ? false : true;

    await this.setStateAsync({ isLoggedIn: JSON.parse(isLoggedIn) });
    await this.setStateAsync({ isTutorialCompleted: JSON.parse(isTutorialCompleted) });
    await this.setStateAsync({ loaded: true });
  }

  render() {
    if (this.state.loaded) {
      if (this.state.isLoggedIn) {
        if (this.state.isTutorialCompleted) {
          return (<MainView />);
        } else {
          return (<GreetingsView isTutorialCompleted={this.state.isTutorialCompleted} />);
        }
      }
      else {
        return (<FBLogin
          buttonView={<FBLoginView isTutorialCompleted={this.state.isTutorialCompleted} />}
          ref={(fbLogin) => { this.fbLogin = fbLogin }}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          permissions={["email"]}
          onLogin={function (e) { OnFBLogin(e) }}
          onLoginFound={function (e) { console.log(e) }}
          onLoginNotFound={function (e) { console.log(e) }}
          onLogout={function (e) { console.log(e) }}
          onCancel={function (e) { console.log(e) }}
          onPermissionsMissing={function (e) { console.log(e) }}
        />);
      }
    } else {
      return (<View><Text>Завантаження...</Text></View>);
    }
  }
}
import React, { Component } from 'react';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { OnFBLogin } from './src/FBLoginHandler.js';
import { AsyncStorage, View, Text } from "react-native";
let FBLoginComponent = require('./src/Components/FBLogin.js');
let Greetings = require('./src/Components/Greetings.js');
let Main = require('./src/Components/Main.js');

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
    let isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    isLoggedIn = isLoggedIn === null ? false : true;
    let isTutorialCompleted = await AsyncStorage.getItem('isTutorialCompleted');
    isTutorialCompleted = isTutorialCompleted === null ? false : true;

    await this.setStateAsync({ isLoggedIn: JSON.parse(isLoggedIn) });
    await this.setStateAsync({ isTutorialCompleted: JSON.parse(isTutorialCompleted) });
    await this.setStateAsync({ loaded: true });
  }

  render() {
    console.disableYellowBox = true; // ToDo: Remove
    if (this.state.loaded) {
      if (this.state.isLoggedIn) {
        if (this.state.isTutorialCompleted) {
          return (<Main />);
        } else {
          return (<Greetings isTutorialCompleted={this.state.isTutorialCompleted} />);
        }
      }
      else {
        return (
          <View style={[{ flex: 1, backgroundColor: "#FFFBE6", alignItems: 'center' }]}>
            <Text style={[{ marginTop: 200, fontSize: 22 }]}>Вітаємо у Geo Meet App!</Text>
            <Text style={[{ marginTop: 20, marginBottom: 100, fontSize: 22 }]}>Вітаємо у Geo Meet App!</Text>
            <FBLogin style={{ position: 'absolute' }}
              buttonView={<FBLoginComponent isTutorialCompleted={this.state.isTutorialCompleted} />}
              ref={(fbLogin) => { this.fbLogin = fbLogin }}
              loginBehavior={FBLoginManager.LoginBehaviors.Native}
              permissions={["email"]}
              onLogin={async (e) => await OnFBLogin(e)}
              onLoginFound={function (e) { console.log(e) }}
              onLoginNotFound={function (e) { console.log(e) }}
              onLogout={function (e) { console.log(e) }}
              onCancel={function (e) { console.log(e) }}
              onPermissionsMissing={function (e) { console.log(e) }}
            />
          </View>
        );
      }
    } else {
      return (<View><Text>Завантаження...</Text></View>);
    }
  }
}
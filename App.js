import React, { Component } from 'react';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { OnFBLogin } from './src/FBLoginHandler.js';
import { AsyncStorage, View, Text, Platform, Image } from "react-native";
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

    const fbView = Platform.OS === 'ios'
      ? FBLoginManager.LoginBehaviors.Web
      : FBLoginManager.LoginBehaviors.WebView;

    await FBLoginManager.setLoginBehavior(fbView);
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
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFFBE6',
              alignItems: 'center'
            }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}>
              <Image
                style={{
                  flex: 1,
                }}
                source={{ uri: "https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=31e82f46b077da92e44712da8f71bc51&auto=format&fit=crop&w=1832&q=80" }}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'center',
              }}>
              <Text style={[{ color: "white", textAlign: 'center', marginTop: 150, fontSize: 22, marginBottom: 20, fontWeight: 'bold' }]}>Вітаємо у Geo Meet App!</Text>
              <Text style={[{ color: "white", textAlign: 'center', fontSize: 22, marginBottom: 20, fontWeight: 'bold' }]}>Знаходь, відвідуй та спілкуйся</Text>
              <Text style={[{ color: "white", textAlign: 'center', fontSize: 22, marginBottom: 180, fontWeight: 'bold' }]}>на публічних заходах.</Text>
              <FBLogin
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
          </View>
        );
      }
    } else {
      return (<View><Text>Завантаження...</Text></View>);
    }
  }
}
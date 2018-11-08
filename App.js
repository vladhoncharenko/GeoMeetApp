import React, { Component } from 'react';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
let FBLoginView = require('./src/FBLoginView.js');
import { OnFBLogin, OnFBLoginFound } from './src/FBLoginHandler.js'

export default class App extends Component {
  render() {
    return (<FBLogin
      buttonView={<FBLoginView />}
      ref={(fbLogin) => { this.fbLogin = fbLogin }}
      loginBehavior={FBLoginManager.LoginBehaviors.Native}
      permissions={["email"]}
      onLogin={function (e) { OnFBLogin(e) }}
      onLoginFound={function (e) { OnFBLoginFound(e) }}
      onLoginNotFound={function (e) { console.log(e) }}
      onLogout={function (e) { console.log(e) }}
      onCancel={function (e) { console.log(e) }}
      onPermissionsMissing={function (e) { console.log(e) }}
    />)
  }
}

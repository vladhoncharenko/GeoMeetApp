import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';
let GreetingsView = require('./GreetingsView.js');

class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    props: PropTypes.shape({})
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (this.getFirstScreen());
  }

  getFirstScreen() {
    if (!this.context.isLoggedIn) {
      return <View style={[]}>
        <Button onPress={() => {
          if (!this.context.isLoggedIn) {
            this.context.login()
          } else {
            return <GreetingsView />;
          }
        }}
          color={"#000000"}
          backgroundColor={"#ffffff"}
          size={20} borderRadius={100}
          title="Увійти через FaceBook">
        </Button>
      </View>
    } else {
      return <GreetingsView />;
    }
  }
}
module.exports = FBLoginView;

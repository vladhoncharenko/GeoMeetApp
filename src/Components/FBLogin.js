import React, { Component } from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import RNRestart from 'react-native-restart';
let Main = require('./Main.js');

class FBLogin extends Component {
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
    if (!this.context.isLoggedIn) {
      return <View style={[]}>
        <Button onPress={() => {
          this.context.login()
        }}
          color={"#000000"}
          backgroundColor={"#ffffff"}
          size={20} borderRadius={100}
          title="Увійти через FaceBook">
        </Button>
      </View>
    } else {
      if (this.props.isTutorialCompleted) {
        return (<Main />);
      } else {
        try {
          return null;
        } catch (error) {
        } finally {
          RNRestart.Restart();
        }
      }
    }
  }
}

module.exports = FBLogin;

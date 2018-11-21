import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import PropTypes from 'prop-types';
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
        return <Text>Завантаження...</Text>
      }
    }
  }
}

module.exports = FBLogin;

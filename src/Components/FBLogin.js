import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements'
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
  };

  render() {
    if (!this.context.isLoggedIn) {
      return <View style={styles.view}>
        <Button onPress={() => {
          this.context.login()
        }}
          color={"#vgt500"}
          rounded={true}
          rightIcon
          buttonStyle={{ elevation: 0 }}
          backgroundColor={"#ffffaaf"}
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

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 500
  },
  view: {
    backgroundColor: "#FFFBE6"
  }
});

module.exports = FBLogin;

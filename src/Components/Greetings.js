import React from 'react';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
let Main = require('./Main.js');

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
});

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../assets/tutorial/1.png'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/tutorial/2.png'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/tutorial/3.png'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
];

class Geetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTutorialCompleted: this.props.isTutorialCompleted
    }
  }

  _onDone = async () => {
    await AsyncStorage.setItem('isTutorialCompleted', JSON.stringify(true));
    this.setState({ isTutorialCompleted: true });
  }

  render() {
    if (this.state.isTutorialCompleted) {
      return <Main />;
    } else {
      return <AppIntroSlider style={{ flex: 1, zIndex: 222 }} slides={slides} onDone={this._onDone} nextLabel={"Далі"} doneLabel={"Готово"} />
    }
  }
}

module.exports = Geetings;
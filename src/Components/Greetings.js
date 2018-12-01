import React from 'react';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
let Main = require('./Main.js');
import Radar from 'react-native-radar';

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
});

const slides = [
  {
    key: 'intro1',
    title: 'Розвивайся!',
    text: 'Шукай та відвідуй публічні заходи.',
    image: require('../../assets/tutorial/intro1.jpeg'),
    imageStyle: styles.image,
    backgroundColor: '#00766c',
  },
  {
    key: 'intro2',
    title: 'Спілкуйся!',
    text: 'Знайомся з новими людьми',
    image: require('../../assets/tutorial/intro2.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#0069c0',
  },
  {
    key: 'intro3',
    title: 'Створюй!',
    text: 'Будуй нові команди, створюй публічні заходи!',
    image: require('../../assets/tutorial/intro3.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#65499c',
  },
  {
    key: 'intro4',
    title: 'Угода користувача',
    text: "Ви даєте згоду на:\n- Обробку ваших даних.\n- Відстеження вашої геопозиції навіть\nколи прогама не активна.\nПри переході далі ви підтверджуєте, що згодні з даними умовами.",
    image: require('../../assets/tutorial/intro4.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#b53d00',
  }
];

class Geetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTutorialCompleted: this.props.isTutorialCompleted
    }
  };

  componentDidMount() {
    Radar.getPermissionsStatus().then((status) => {
      if (status === "DENIED" || status === "UNKNOWN") {
        Radar.requestPermissions(true);
      }
    });
  };

  _onDone = async () => {
    await AsyncStorage.setItem('isTutorialCompleted', JSON.stringify(true));
    this.setState({ isTutorialCompleted: true });
  };

  render() {
    if (this.state.isTutorialCompleted) {
      return <Main />;
    } else {
      return <AppIntroSlider style={{ flex: 1, zIndex: 222 }} slides={slides} onDone={this._onDone} nextLabel={"Далі"} doneLabel={"Готово"} />
    }
  }
}

module.exports = Geetings;
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, ScrollView, AsyncStorage,StyleSheet} from 'react-native';
import { BASE_URL } from '../consts';
import { ListItem , Button} from 'react-native-elements';
import { FBLoginManager } from 'react-native-facebook-login';
import RNRestart from 'react-native-restart';
const axios = require('axios');

var t = require('tcomb-form-native');
var Form = t.form.Form;

var User = t.struct({
  userName: t.String,
  description: t.maybe(t.String),
});

var options = {
  fields: {
    userName: {
      label: 'Ім\'я користувача',
      editable: false
    },
    description: {
      label: 'Про себе',
      maxLength: 200,
    }
  }
};

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: true,
      value: { userName: "", description: "" },
      events: [],
      isLoading: true
    }
  };

  async componentDidMount() {
    this._sub = this.props.navigation.addListener('didFocus', async () =>
      await this.updateData()
    );
    await this.updateData();
  };

  async updateData() {
    try {
      let userId = await AsyncStorage.getItem('userId');
      let auth_token = await AsyncStorage.getItem('auth_token');
      var config = {
        headers: {'x-amz-security-token':  auth_token}
      };
      const events = await axios.get(BASE_URL + "users/" + userId + "/geofences", config);
      const userData = await axios.get(BASE_URL + "users/" + userId, config);

      this.setState({
        events: events.data,
        isLoading: false,
        value: { userName: userData.data.name, description: userData.data.description },
      });

    } catch (error) {
      console.log(error)
    }
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
  };

  static navigationOptions = {
    tabBarLabel: 'Налаштування',
    tabBarIcon: () => (<Icon size={24} color="white" name="settings" />)
  }

  onFormChange(value) {
    this.setState({ value });
    const formValues = this.refs.form.getValue();
    if (formValues) {
      this.setState({ buttonState: false });
    } else {
      this.setState({ buttonState: true });
    }
  };

  async save() {
    const formValues = this.refs.form.getValue();
    try {
      let user = JSON.parse(await AsyncStorage.getItem('user'));
      let userId = await AsyncStorage.getItem('userId');
      user.description = formValues.description;
      await axios.put(BASE_URL + "users/" + userId, { profile: user });
      this.setState({ buttonState: true });
    } catch (error) {
      console.log(error)
    }
  };

  async logout() {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('isRadarInit');
    await AsyncStorage.removeItem('isTutorialCompleted');

    FBLoginManager.logout(function (error, data) {
      if (!error) {
        console.log("logget out")

        RNRestart.Restart();
      } else {
        console.log(error, data);
      }

    });
  };

  async deleteEvent(id) {
    try {
      let auth_token = await AsyncStorage.getItem('auth_token');
      var config = {
        headers: {'x-amz-security-token':  auth_token}
      };
      await axios.delete(BASE_URL + "geofences/" + id, config);
      this.setState({
        events: this.state.events.filter(function (obj) {
          return obj._id !== id;
        })
      });
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    return (<View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginLeft:30, marginRight:30}}>
      <Text style={{marginTop:20}}></Text>
        <Form
          ref="form"
          type={User}
          options={options}
          value={this.state.value}
          onChange={this.onFormChange.bind(this)}
        />
        <Text>Ваші заходи:</Text>
        {!this.state.isLoading &&
          <View >
            {
              this.state.events.map((item, index) => (
                <ListItem
                  title={<Text>{item.name}</Text>}
                  key={item._id}
                  containerStyle={{marginBottom:5, backgroundColor: '#B9E4C9'}}
                  rightIcon={<Icon
                    name={'delete'}
                    size={20}
                    onPress={async () => await this.deleteEvent(item._id)}
                  />
                  }
                />
              ))
            }
          </View>}
        <Button buttonStyle={{marginTop:50,elevation: 0}} title="Зберегти" onPress={() => this.save()} disabled={this.state.buttonState} />
        <Button buttonStyle={{marginTop:10,elevation: 0}} title="Вийти з профілю" onPress={async () => await this.logout()} />
      </ScrollView>
    </View>);
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFFBE6'
  },
  location: {
      backgroundColor: '#FFFBE6',
      margin: 25
  },
  buttonText: {
      fontSize: 18,
      color: '#FD5523',
      alignSelf: 'center'
  },
  button: {
      height: 36,
      backgroundColor: '#B9E4C9',
      borderColor: '#B9E4C9',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
  },
  createEventBtn: {
      position: 'absolute',
      top: 32,
      left: 24,
  }
});

module.exports = Settings;
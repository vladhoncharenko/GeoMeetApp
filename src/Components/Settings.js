import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, Button, ScrollView } from 'react-native';

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
      value: { userName: "VLAD H" },
      events: [
        {
          id: 0,
          name: 'Ben',
        },
        {
          id: 1,
          name: 'Susan',
        },
        {
          id: 2,
          name: 'Robert',
        },
        {
          id: 3,
          name: 'Mary',
        }
      ]
    }
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

  save() {
    const formValues = this.refs.form.getValue();
    console.log(formValues);
  };

  deleteEvent(id) {
    console.log(id)
    this.setState({
      events: this.state.events.filter(function (obj) {
        return obj.id !== id;
      })
    })
  };

  render() {
    return (<View>
      <ScrollView>
        <Form
          ref="form"
          type={User}
          options={options}
          value={this.state.value}
          onChange={this.onFormChange.bind(this)}
        />
        <Text>Ваші заходи:</Text>
        <View >
          {
            this.state.events.map((item) => (
              <Text style={{ backgroundColor: '#48BBEC', marginBottom: 3 }}>
                {item.name} <Icon size={35} color="white" name="settings" onPress={() => this.deleteEvent(item.id)} />
              </Text>
            ))
          }
        </View>
        <Button title="Зберегти" onPress={() => this.save()} disabled={this.state.buttonState} >
        </Button>
      </ScrollView>
    </View>);
  }
}

module.exports = Settings;

import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Button, ScrollView, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import moment from 'moment';
import RNGooglePlacePicker from 'react-native-google-place-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BASE_URL } from '../consts';
const axios = require('axios');

var t = require('tcomb-form-native');
var Form = t.form.Form;
const Radius = t.enums({
    50: "50",
    75: "75",
    100: "100",
    125: "125",
    150: "150"
  });

var Event = t.struct({
    name: t.String,
    startDate: t.Date,
    startTime: t.Date,
    endDate: t.Date,
    endTime: t.Date,
    radius: Radius,
    description: t.String
});

var options = {
    fields: {
        name: {
            label: 'Назва',
            maxLength: 20
        },
        radius: {
            label: 'Радіус',
            maxLength: 3
        },
        description: {
            label: 'Опис',
            maxLength: 40,
        },
        startDate: {
            mode: 'date',
            label: 'Дата початку',
            config: {
                format: (date) => moment(date).format('DD.MM'),
            },
        },
        startTime: {
            mode: 'time',
            label: 'Час початку',
            config: {
                format: (date) => moment(date).format('H:mm'),
            },
        },
        endDate: {
            mode: 'date',
            label: 'Дата кінця',
            config: {
                format: (date) => moment(date).format('DD.MM'),
            },
        },
        endTime: {
            mode: 'time',
            label: 'Час кінця',
            config: {
                format: (date) => moment(date).format('H:mm'),
            }
        }
    }
};

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            buttonState: true,
            value: {}
        }
    };

    async createLocation() {
        try {
            let values = {};
            let form = this.refs.form.getValue();
            let userId = await AsyncStorage.getItem('userId');
            Object.assign(values, form);
            values.creatorId = userId;
            values.location = this.state.location;
            await axios.post(BASE_URL + "/geofences", values);
        } catch (error) {
            console.log(error);
        }

        this.back(true);
    };

    back(shouldUpdate) {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Events', params: { shouldUpdate: shouldUpdate } })
            ],
        }))
    };

    onFormChange(value) {
        this.setState({ value });
        const formValues = this.refs.form.getValue();
        if (formValues && this.state.location) {
            this.setState({ buttonState: false });
        } else {
            this.setState({ buttonState: true });
        }
    };

    getLocation() {
        this.form = this.refs.form;
        RNGooglePlacePicker.show((response) => {
            if (response.didCancel) {
                console.log('User cancelled GooglePlacePicker');
            }
            else if (response.error) {
                console.log('GooglePlacePicker Error: ', response.error);
            }
            else {
                const formValues = this.refs.form.getValue();
                this.setState({ location: response, buttonState: !formValues });
            }
        })
    };

    render() {
        return (
            <View>
                <ScrollView>
                    <Text>Створити новий захід:</Text>
                    <Form
                        ref="form"
                        type={Event}
                        options={options}
                        value={this.state.value}
                        onChange={this.onFormChange.bind(this)}
                    />

                    <TouchableHighlight style={styles.button} onPress={this.getLocation.bind(this)} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Вибрати локацію</Text>
                    </TouchableHighlight>

                    <View style={styles.location}>
                        <Text style={{ color: 'black', fontSize: 15 }}>
                            {!this.state.location ? ("") : (this.state.location.address)}
                        </Text>
                    </View>
                    <Button title="Створити" style={styles.button} onPress={async () => await this.createLocation()} disabled={this.state.buttonState} >
                    </Button>

                </ScrollView>
                <Icon
                    name='chat'
                    size={35}
                    onPress={() => this.back(false)}
                    style={styles.createEventBtn}
                    color='white' />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    location: {
        backgroundColor: 'white',
        margin: 25
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
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

module.exports = CreateEvent;
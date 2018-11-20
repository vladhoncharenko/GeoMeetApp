
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Button, ScrollView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import moment from 'moment';
import RNGooglePlacePicker from 'react-native-google-place-picker';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var Event = t.struct({
    name: t.String,
    startDate: t.Date,
    startTime: t.Date,
    endDate: t.Date,
    endTime: t.Date,
    radius: t.refinement(t.Number, function (s) { return s > 50 && s < 151; }),
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

    createLocation() {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Events', params: { shouldUpdate: true } })
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
                    <Button title="Створити" style={styles.button} onPress={() => this.createLocation()} disabled={this.state.buttonState} >
                    </Button>

                </ScrollView>
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
    }
});

module.exports = CreateEvent;
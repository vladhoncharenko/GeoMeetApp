
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
var t = require('tcomb-form-native');
import moment from 'moment';

var Form = t.form.Form;


var Event = t.struct({
    name: t.String,
    startDate: t.Date,
    startTime: t.Date,
    endDate: t.Date,
    endTime: t.Date,
    radius: t.Number,
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
            maxLength: 2
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

    }


    login() {
        const formValues = this.refs.form.getValue();
        console.log('FORM VALUES', formValues);
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Events', params: { shouldUpdate: true } })
            ],
        }))
    }


    render() {
        return (

            <View style={styles.container}>
            <Text>Створити новий захід:</Text>
                <Form
                    ref="form"
                    type={Event}
                    options={options}
                />
                <TouchableHighlight style={styles.button} onPress={() => this.login()} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>




        );
    }
}

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 10,
        padding: 20,
        
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
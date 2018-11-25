import { AsyncStorage } from "react-native";
import RNRestart from 'react-native-restart';
import { BASE_URL } from './consts';
const axios = require('axios');

export async function OnFBLogin(event) {
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
    await AsyncStorage.setItem('user', JSON.stringify(event.profile));
    try {
        const result = await axios.post(BASE_URL + "/users", { profile: event.profile });
        let token = "";
        if (result.headers.hasOwnProperty('auth_token')){
            token = result.headers.auth_token;
        }
        await AsyncStorage.setItem('auth_token', token);
        await AsyncStorage.setItem('userId', result.data[0]._id);
    } catch (error) {
        console.log(error)
    }
    let userId = await AsyncStorage.getItem('userId');
    console.log("uid")
    console.log(userId)

    RNRestart.Restart();
};
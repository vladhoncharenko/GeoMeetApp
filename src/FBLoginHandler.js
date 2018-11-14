import { AsyncStorage } from "react-native";

export function OnFBLogin(event) {
    AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
    AsyncStorage.setItem('user', JSON.stringify(event.profile));
};
import { AsyncStorage } from "react-native"
 
 export async function OnFBLogin(event)  {
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
    
    console.log(event);
};
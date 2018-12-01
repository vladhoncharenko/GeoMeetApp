import { AsyncStorage } from 'react-native';
import { CHATKIT_TOKEN_PROVIDER_ENDPOINT, CHATKIT_INSTANCE_LOCATOR } from "./consts";
import Chatkit from "@pusher/chatkit-client/react-native";

export default async function getCurrentUser() {
    try {
        let userId = await AsyncStorage.getItem('userId');
        const tokenProvider = new Chatkit.TokenProvider({
            url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
        });

        this.chatManager = new Chatkit.ChatManager({
            instanceLocator: CHATKIT_INSTANCE_LOCATOR,
            userId: userId,
            tokenProvider: tokenProvider
        });
        let currentUser = await this.chatManager.connect();

        return currentUser;
    } catch (error) {
        console.log("Error during getCurrentUser()", error)
    }
};
import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    exampleContainer: {
        paddingVertical: 30,
        backgroundColor: 'transparent',
        position: "absolute",
        bottom: 1,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    slider: {
        marginTop: 15,
        overflow: 'visible',
        backgroundColor: 'transparent'
    },
    sliderContentContainer: {
        paddingVertical: 10,
    },
    createEventBtn: {
        position: 'absolute',
        top: 32,
        left: 24,
    }
});
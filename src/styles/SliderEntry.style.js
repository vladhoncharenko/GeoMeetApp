import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './Events.style';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18, // needed for shadow
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: '#FFFBE6',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: '#FFFBE6',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
 
    textContainer: {
        justifyContent: 'center',
        paddingTop: entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        color: colors.black,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    },
    footerButtons: {
        flexDirection: 'row',
             justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      bottom: 0
      },
      icon: {
        color: 'white',
      },
      
      iconRound: {
        marginRight: 9,
        fontSize: 29,
      },

    scrollView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30,
        zIndex: 10,
      },
      slideStyle: {
        flex: 1,
        borderRadius: 10,
        margin: 2,
        elevation: 1,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        backgroundColor: 'white',
      },
      slideTopRow: {
        flex: 0.60,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 14,
      },
      slideIcon: {
        height: 43,
        width: 43,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: 43 / 2,
      },
      slideMeta: {
        paddingLeft: 8,
        justifyContent:'center',
        flex: 1,
      },
      slideMetaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      slideBottomRow: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 22,
        flex: 0.40,
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      header: {
        fontSize: 19,
        color: 'white',
      },
      subheader: {
        fontSize: 14,
        color: 'white',
      },
});
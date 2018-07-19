import { StyleSheet, Dimensions, I18nManager } from "react-native";
import { mainColor } from "../../constants/Colors";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    closeIconWrapper: {
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 10
    },
    modalTxt: {
        marginHorizontal: 10,
        lineHeight: 30
    },
    title: {
        fontSize: I18nManager.isRTL ? 60 : 70,
        fontWeight: 'normal',
        textAlign: 'center',
        fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_light'
    },
    input: {
        fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_light',
    },
    footer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    signupBtn: {
        backgroundColor: mainColor,
        marginHorizontal: 60,
        paddingVertical: 30,
        flex: 1
    },
    footerTxt: {
        fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_regular',
        fontSize: 15,
    },
    haveAnAcc: {
        fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_regular',
        // fontSize: 20,
        marginTop: 20
    },
    privacyPolicay: {
        fontFamily: I18nManager.isRTL ? 'ElMessiri-Regular' : 'quicksand_regular',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        color: 'grey'
    }
});
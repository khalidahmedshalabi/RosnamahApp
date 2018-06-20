import { StyleSheet, Dimensions } from "react-native";
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
    btnTxt: {
        fontSize: 70,
        fontWeight: 'normal',
        textAlign: 'center',
        fontFamily: 'quicksand_light'
    },
    input: {
        fontFamily: 'quicksand_light',
    },
    footer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    signupBtn: {
        backgroundColor: '#FF2A65',
        marginHorizontal: 60,
        paddingVertical: 30,
        flex: 1
    },
    footerTxt: {
        fontFamily: 'quicksand_regular',
        fontSize: 20,
    },
    privacyPolicay: {
        fontFamily: 'quicksand_regular',
        marginTop: 20,
        textAlign: 'center'
    }
});
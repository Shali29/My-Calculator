import { StyleSheet } from "react-native";
import { myColors } from "./Colors";

export const Styles = StyleSheet.create({
     // Container Background
     container: {
        flex: 1,
        backgroundColor: myColors.background,
        justifyContent: "center",
        alignItems: "center",
    },

    // Button
    btnBlue: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.pink,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnDark: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.btnDark,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnLight: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.blush,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        borderColor: myColors.black,
    },
    btnGray: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.btnBlack,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    smallTextLight: {
        fontSize: 32,
        color: myColors.blush,
    },
    smallTextDark: {
        fontSize: 32,
        color: myColors.black,
    },
    // Keyboard
    row: {
        maxWidth: '100%',
        flexDirection: "row",
    },
    viewBottom: {
        position: 'absolute',
        bottom: 50,
    },
    screenFirstNumber: {
        fontSize: 96,
        color: myColors.gray,
        fontWeight: '200',
        alignSelf: "flex-end",
    },
    screenSecondNumber: {
        fontSize: 40,
        color: myColors.gray,
        fontWeight: '200',
        alignSelf: "flex-end",
    },
})
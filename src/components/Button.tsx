import { Text, TouchableOpacity } from "react-native";

import { Styles } from "../styles/GlobalStyles";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

interface ButtonProps {
    onPress: () => void;
    title: string;
    isBlue?: boolean;
    isGray?: boolean;
}

export default function Button({ title, onPress, isBlue, isGray }: ButtonProps) {
    const theme = useContext(ThemeContext);
    return (
        <TouchableOpacity 
            style={
                isBlue 
                ? Styles.btnBlue 
                : isGray 
                ? Styles.btnGray
                : theme === "light" 
                ? Styles.btnLight 
                : Styles.btnDark
            } 
            onPress={onPress}>
            <Text 
               style={
                   isBlue || isGray 
                   ? Styles.smallTextLight
                   : theme === "dark" 
                   ? Styles.smallTextDark 
                   : Styles.smallTextDark 
                }
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

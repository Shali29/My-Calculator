// Shalika Ramanayaka -IM/2021/118

import * as React from "react"; // Import the React library for building components
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native"; // Import essential React Native components for UI building

import Button from "./Button";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function MyKeyboard() {
    const [currentInput, setCurrentInput] = React.useState("");
    const [calculationString, setCalculationString] = React.useState("");
    const [result, setResult] = React.useState<number | null>(null);
    const [lastOperator, setLastOperator] = React.useState<string | null>(null);
    const [awaitingSecondNumber, setAwaitingSecondNumber] = React.useState(false);
    const [isResultDisplayed, setIsResultDisplayed] = React.useState(false);
    const [historyVisible, setHistoryVisible] = React.useState(false);
    const [history, setHistory] = React.useState<
        { calculation: string; result: number }[]
    >([]);

    const performOperation = (a: number, b: number, operation: string): number | string => {
        switch (operation) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return b === 0 ? "Cannot divide by zero" : a / b;
            case "%":
                return a * (b / 100);
            default:
                return b;
        }
    };
    

    const handleNumberPress = (buttonValue: string) => {
        if (buttonValue === ".") {
            // Prevent multiple decimal points in the same number
            if (currentInput.includes(".")) return;
        }
    
        if (isResultDisplayed) {
            // Reset everything if result is already displayed
            setCurrentInput(buttonValue);
            setCalculationString("");
            setResult(null);
            setLastOperator(null);
            setAwaitingSecondNumber(false);
            setIsResultDisplayed(false);
        } else if (awaitingSecondNumber) {
            // Start the second number in the calculation
            setCurrentInput(buttonValue);
            setAwaitingSecondNumber(false);
            setCalculationString((prev) => `${prev} ${buttonValue}`);
        } else {
            // Append the button value to the current input
            const newInput = currentInput + buttonValue;
            setCurrentInput(newInput);
            setCalculationString((prev) => `${prev}${buttonValue}`);
        }
    };
    
    const handleOperationPress = (operation: string) => {
        if (currentInput === "" && result === null) return;

        const currentNumber = currentInput === "" ? result! : parseFloat(currentInput);

        if (operation === "%") {
            if (currentInput) {
                const percentageValue = parseFloat(currentInput) / 100;
                setCurrentInput(percentageValue.toString());
                setCalculationString(`${currentInput} %`);
                setIsResultDisplayed(true);
                setResult(percentageValue);
            }
            return;
        }

        if (isResultDisplayed) {
            setCalculationString(`${currentNumber} ${operation}`);
            setLastOperator(operation);
            setCurrentInput("");
            setIsResultDisplayed(false);
            setAwaitingSecondNumber(true);
        } else if (result !== null && awaitingSecondNumber === false) {
            const newResult = performOperation(result, currentNumber, lastOperator!);
            setResult(newResult);
            setCalculationString((prev) => `${prev} ${operation}`);
            setAwaitingSecondNumber(true);
        } else if (result === null) {
            setResult(currentNumber);
            setAwaitingSecondNumber(true);
            setCalculationString((prev) => `${prev} ${operation}`);
        }

        setLastOperator(operation);
        setCurrentInput("");
    };

    const getResult = () => {
    if (currentInput === "" || lastOperator === null) return;

    const currentNumber = parseFloat(currentInput);
    const finalResult = performOperation(result!, currentNumber, lastOperator);

    if (typeof finalResult === "string") {
        // If an error occurs (e.g., division by zero), display the error message
        setCurrentInput(finalResult);
        setCalculationString("");
        setIsResultDisplayed(true);
    } else {
        setResult(finalResult);
        setIsResultDisplayed(true);
        setHistory([
            ...history,
            { calculation: calculationString + " =", result: finalResult },
        ]);
        setCalculationString("");
        setCurrentInput(finalResult.toString());
        setLastOperator(null);
        setAwaitingSecondNumber(false);
    }
};


    const clear = () => {
        setCurrentInput("");
        setCalculationString("");
        setResult(null);
        setLastOperator(null);
        setAwaitingSecondNumber(false);
        setIsResultDisplayed(false);
    };

    const clearHistory = () => setHistory([]);

    const removeHistoryItem = (index: number) => {
        const newHistory = [...history];
        newHistory.splice(index, 1);
        setHistory(newHistory);
    };

    const handleBackspace = () => {
        setCurrentInput(currentInput.slice(0, -1));
        setCalculationString(calculationString.slice(0, -1));
    };

    const handleSquareRoot = () => {
        if (currentInput === "") return;
        const number = parseFloat(currentInput);
        if (number < 0) {
            setCurrentInput("Error");
            setIsResultDisplayed(true);
            return;
        }
        const squareRoot = Math.sqrt(number);
        setCurrentInput(squareRoot.toString());
        setIsResultDisplayed(true);
        setCalculationString("");
    };

    const handleHistoryItemClick = (calculation: string, result: number) => {
        setCurrentInput(result.toString());
        setCalculationString(calculation);
        setResult(result);
        setIsResultDisplayed(true);
        setHistoryVisible(false);
    };

    const getFontSize = () => (currentInput.length > 8 ? 40 : 50);
    const getFontSizei = () => (calculationString.length > 8 ? 30 : 40);
    
    return (
        <View style={Styles.viewBottom}>
            {!historyVisible ? (
                <>
                    <View style={styles.header}>
                    
                        <TouchableOpacity onPress={() => setHistoryVisible(true)}>
                            <Text style={styles.historyButton}>History</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            height: 120,
                            width: "90%",
                            justifyContent: "flex-end",
                            alignSelf: "center",
                        }}
                    >
                        <Text style={[Styles.screenSecondNumber,{ color: myColors.gray, fontSize: getFontSizei() }]}>
                            {isResultDisplayed ? "" : calculationString}
                        </Text>
                        <Text
                            style={[
                                Styles.screenFirstNumber,
                                { color: myColors.result, fontSize: getFontSize() },
                            ]}
                        >
                            {currentInput || result || "0"}
                        </Text>
                    </View>
                    <View style={Styles.row}>
                        <Button title="C" isGray onPress={clear} />
                        <Button title="⌫" isGray onPress={handleBackspace} />
                        <Button title="%" isBlue onPress={() => handleOperationPress("%")} />
                        <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
                    </View>
                    <View style={Styles.row}>
                        <Button title="7" onPress={() => handleNumberPress("7")} />
                        <Button title="8" onPress={() => handleNumberPress("8")} />
                        <Button title="9" onPress={() => handleNumberPress("9")} />
                        <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
                    </View>
                    <View style={Styles.row}>
                        <Button title="4" onPress={() => handleNumberPress("4")} />
                        <Button title="5" onPress={() => handleNumberPress("5")} />
                        <Button title="6" onPress={() => handleNumberPress("6")} />
                        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
                    </View>
                    <View style={Styles.row}>
                        <Button title="1" onPress={() => handleNumberPress("1")} />
                        <Button title="2" onPress={() => handleNumberPress("2")} />
                        <Button title="3" onPress={() => handleNumberPress("3")} />
                        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
                    </View>
                    <View style={Styles.row}>
                        <Button title="0" onPress={() => handleNumberPress("0")} />
                        <Button title="." onPress={() => handleNumberPress(".")} />
                        <Button title="√" onPress={handleSquareRoot} />
                        <Button title="=" isBlue onPress={getResult} />
                    </View>
                </>
            ) : (
                <View style={styles.historyContainer}>
                    <Text style={styles.historyTitle}>History</Text>
                    <ScrollView>
                        {history.length > 0 ? (
                            history.map((item, index) => (
                                <View key={index} style={styles.historyItemContainer}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleHistoryItemClick(item.calculation, item.result)
                                        }
                                    >
                                        <Text style={styles.historyItem}>
                                            {item.calculation} {item.result}
                                        </Text>
                                    </TouchableOpacity>
                                    
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noHistory}>No history available</Text>
                        )}
                    </ScrollView>
                    <View style={styles.historyActions}>
                        <TouchableOpacity onPress={() => setHistoryVisible(false)}>
                            <Text style={styles.actionButton}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={clearHistory}>
                            <Text style={styles.actionButton}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    title: { 
        fontSize: 24,
        fontWeight: "bold",
        color: myColors.result,
        marginBottom:80
    },
    
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 20,
    },
    
    historyButton: {
        fontSize: 20,
        marginBottom:70,
        color:myColors.gray
    },
    
    historyContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,  
        marginBottom: 300, 
    },
    
    historyTitle: {
        fontSize: 60,
        color: myColors.gray,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,  
    },
    
    historyItem: {
        fontSize: 30,
        color: myColors.result,
        marginBottom: 10,
        marginLeft:18,
    },
    
    deleteButton: {
        fontSize: 14,
        color: "red",
    },
    
    historyItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30, 
    },
    
    noHistory: {
        textAlign: "center",
        color: "gray",
        marginBottom: 60,  
    },
    
    historyActions: {
        position: "absolute", 
        bottom: 20,            
        left: 0,              
        right: 0,             
        flexDirection: "row",
        justifyContent: "space-between",  
        paddingHorizontal: 20,  
        paddingVertical: 10,
        marginBottom: -150,    
    },
    
    actionButton: {
        fontSize: 16,          
        color: myColors.gray,
        paddingHorizontal: 10, 
        paddingVertical: 5,   
    },
        
});


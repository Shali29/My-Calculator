import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';

import MyKeyboard from './src/components/MyKeyboard'; // Assuming MyKeyboard is a custom component
import { ThemeContext } from './src/context/ThemeContext';
import { myColors } from './src/styles/Colors'; // Make sure these colors are defined in your styles

export default function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme === 'light' ? myColors.lightBackground : myColors.darkBackground },
        ]}
      >
        <View style={styles.switchContainer}>
          <Text style={[styles.text, { color: theme === 'light' ? 'black' : 'white' }]}>
            {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
          </Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            ios_backgroundColor="black"
            style={styles.switch}
          />
        </View>

        <MyKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  switch: {
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});

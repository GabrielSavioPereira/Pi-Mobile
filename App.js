import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { MD3LightTheme, Provider as PaperProvider, Button, Text } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0056b3', 
    secondaryContainer: '#e3f2fd', 
    onSecondaryContainer: '#0056b3',
  },
};

export default function App() {
  const [display, setDisplay] = useState('');

  const handlePress = (value) => {
    if (value === '=') {
      try {
        const result = eval(display); 
        setDisplay(String(result));
      } catch (e) {
        setDisplay('Erro');
      }
    } else if (value === 'C') {
      setDisplay('');
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        
        
        <View style={styles.displayArea}>
          <Text variant="displayLarge" style={styles.displayText}>
            {display || '0'}
          </Text>
        </View>
        <View style={styles.grid}>
          {[
            ['7', '8', '9', '/'],
            ['4', '5', '6', '*'],
            ['1', '2', '3', '-'],
            ['C', '0', '=', '+']
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((char) => {
                const isOperator = ['/', '*', '-', '+', '='].includes(char);
                return (
                  <Button 
                    key={char}
                    mode={isOperator ? "contained" : "secondary-container"} 
                    onPress={() => handlePress(char)} 
                    style={styles.btn}
                    labelStyle={styles.btnLabel}
                    contentStyle={{ height: 70 }}
                  >
                    {char}
                  </Button>
                  );})}
            </View>
          ))}
        </View>
        
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'flex-end', 
    paddingBottom: 30 
  },
  displayArea: { 
    padding: 30, 
    alignItems: 'flex-end', 
    justifyContent: 'center',
    flex: 1 
  },
  displayText: { 
    color: '#0056b3', 
    fontWeight: '300' 
  },
  grid: { 
    paddingHorizontal: 15 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 
  },
  btn: { 
    flex: 1, 
    margin: 6, 
    borderRadius: 12 
  },
  btnLabel: { 
    fontSize: 26 
  }
});
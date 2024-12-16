import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Screen from './Screen';
import ButtonGrid from './ButtonGrid';
import ConversionModal from './conversionModal';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<null | number>(null); 
  const [operator, setOperator] = useState('');
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [expression, setExpression] = useState('');
  const [showConversionModal, setShowConversionModal] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setExpression(prev => prev + String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
      setExpression(prev => {
        
        if (['+', '-', '*', '/'].some(op => prev.endsWith(op))) {
          return prev + ' ' + digit;
        }
        return prev === '0' ? String(digit) : prev + digit;
      });
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setExpression(prev => prev + '0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
      setExpression(prev => prev + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setFirstOperand(null);
    setOperator('');
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (operator && waitingForSecondOperand) {
      
      setOperator(nextOperator);
      setExpression(prev => {
        
        const newExpression = prev.trim().slice(0, -1) + nextOperator;
        return newExpression;
      });
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
      setExpression(`${result} ${nextOperator} `);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
    if (nextOperator !== '=') {
      setExpression(prev => {
        
        if (['+', '-', '*', '/'].some(op => prev.endsWith(op))) {
          return prev.slice(0, -1) + nextOperator;
        }
        
        return `${prev} ${nextOperator}`;
      });
    }
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string): number => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const convertUnits = (conversionType: string, value: number) => {
      const numValue = value;
    let result;
    let fromUnit, toUnit;

    switch (conversionType) {
      case 'kg-lb':
        result = numValue * 2.20462;
        fromUnit = 'kg';
        toUnit = 'lb';
        break;
      case 'lb-kg':
        result = numValue * 0.453592;
        fromUnit = 'lb';
        toUnit = 'kg';
        break;
      case 'lb-oz':
        result = numValue * 16;
        fromUnit = 'lb';
        toUnit = 'oz';
        break;
      case 'oz-lb':
        result = numValue / 16;
        fromUnit = 'oz';
        toUnit = 'lb';
        break;
      default:
        return;
    }

    setDisplay(result.toFixed(2));
    setExpression(`${numValue} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`);
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    if (operator && firstOperand !== null) {
      
      const percentValue = (firstOperand * value) / 100;
      setDisplay(String(percentValue));
      setExpression(prev => `${prev}${value}% = ${percentValue}`);
    } else {
      
      const result = value / 100;
      setDisplay(String(result));
      setExpression(`${value}% = ${result}`);
    }
    setWaitingForSecondOperand(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Screen value={display} expression={expression} />
        <ButtonGrid
          onDigitPress={inputDigit}
          onDecimalPress={inputDecimal}
          onClearPress={clear}
          onOperatorPress={performOperation}
          onEqualsPress={() => performOperation('=')}
          onConvertPress={() => setShowConversionModal(true)}
          onPercentPress={handlePercent}
        />
        <ConversionModal
          visible={showConversionModal}
          onClose={() => setShowConversionModal(false)}
          onConvert={convertUnits}
          value={parseFloat(display)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
});


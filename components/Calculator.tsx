import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from './Screen';
import ButtonGrid from './ButtonGrid';
import ConversionModal from './conversionModal';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [expression, setExpression] = useState('');
  const [showConversionModal, setShowConversionModal] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setExpression(expression + String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
      setExpression(expression + String(digit));
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setExpression(expression + '0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
      setExpression(expression + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

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
      setExpression(expression + ` ${nextOperator} `);
    }
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
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

  return (
    <View style={styles.container}>
      <Screen value={display} expression={expression} />
      <ButtonGrid
        onDigitPress={inputDigit}
        onDecimalPress={inputDecimal}
        onClearPress={clear}
        onOperatorPress={performOperation}
        onEqualsPress={() => performOperation('=')}
        onConvertPress={() => setShowConversionModal(true)}
      />
      <ConversionModal
        visible={showConversionModal}
        onClose={() => setShowConversionModal(false)}
        onConvert={convertUnits}
        value={parseFloat(display)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
});


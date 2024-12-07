import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';
import { MaterialIcons } from '@expo/vector-icons';

interface ButtonGridProps {
  onDigitPress: (digit: string) => void;
  onDecimalPress: () => void;
  onClearPress: () => void;
  onOperatorPress: (operator: string) => void;
  onEqualsPress: () => void;
  onConvertPress: () => void;
}

export default function ButtonGrid({
  onDigitPress,
  onDecimalPress,
  onClearPress,
  onOperatorPress,
  onEqualsPress,
  onConvertPress
}: ButtonGridProps) {
  const renderButton = (title: string, onPress: (title: string) => void, color?: string, backgroundColor?: string) => (
    <Button title={title} onPress={() => onPress(title)} color={color} backgroundColor={backgroundColor} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {renderButton('C', onClearPress, '#333333', '#a0a0a0')}
        {renderButton('()', () => {}, '#f0f0f0', '#666666')}
        {renderButton('%', () => {}, '#f0f0f0', '#666666')}
        {renderButton('/', onOperatorPress, '#f0f0f0', '#ff9500')}
      </View>
      <View style={styles.row}>
        {renderButton('7', onDigitPress)}
        {renderButton('8', onDigitPress)}
        {renderButton('9', onDigitPress)}
        {renderButton('*', onOperatorPress, '#f0f0f0', '#ff9500')}
      </View>
      <View style={styles.row}>
        {renderButton('4', onDigitPress)}
        {renderButton('5', onDigitPress)}
        {renderButton('6', onDigitPress)}
        {renderButton('-', onOperatorPress, '#f0f0f0', '#ff9500')}
      </View>
      <View style={styles.row}>
        {renderButton('1', onDigitPress)}
        {renderButton('2', onDigitPress)}
        {renderButton('3', onDigitPress)}
        {renderButton('+', onOperatorPress, '#f0f0f0', '#ff9500')}
      </View>
      <View style={styles.row}>
        {renderButton('0', onDigitPress)}
        {renderButton('.', onDecimalPress)}
        <Button
          title={<MaterialIcons name="straighten" size={24} color="#f0f0f0" />}
          onPress={onConvertPress}
          backgroundColor="#666666"
        />
        {renderButton('=', onEqualsPress, '#f0f0f0', '#ff9500')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});


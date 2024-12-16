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
  onPercentPress: () => void; 
}

export default function ButtonGrid({ 
  onDigitPress,
  onDecimalPress,
  onClearPress,
  onOperatorPress,
  onEqualsPress,
  onConvertPress,
  onPercentPress
}: ButtonGridProps) {
  const renderButton = (title: string, onPress: (arg: string) => void, color?: string, backgroundColor?: string, style?: object) => ( 
    <Button title={title} onPress={() => onPress?.(title)} color={color} backgroundColor={backgroundColor} style={style} /> 
  );

  return (  
    <View style={styles.container}> 
      <View style={styles.row}>
        {renderButton('C', onClearPress, '#333333', '#a0a0a0')}
        {renderButton('%', onPercentPress, '#f0f0f0', '#666666')}
        <Button 
          title={<MaterialIcons name="straighten" size={28} color="#f0f0f0" />}
          onPress={onConvertPress}
          backgroundColor="#666666"
        />
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
        {renderButton('0', onDigitPress, '#f0f0f0', '#333333', styles.zeroButton)}
        {renderButton('.', onDecimalPress)}
        {renderButton('=', onEqualsPress, '#f0f0f0', '#ff9500')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  zeroButton: {
    width: 156,
    alignItems: 'flex-start',
    paddingLeft: 28,
  },
});


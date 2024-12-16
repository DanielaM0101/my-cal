import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScreenProps {
  value: string;
  expression: string;
}

export default function Screen({ value, expression }: ScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.expression} numberOfLines={2} adjustsFontSizeToFit>
        {expression}
      </Text>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    width: '100%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    minHeight: 120,
    justifyContent: 'flex-end',
  },
  expression: {
    color: '#888',
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 8,
  },
  value: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});


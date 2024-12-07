import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScreenProps {
  value: string;
  expression: string;
}

export default function Screen({ value, expression }: ScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.expression} numberOfLines={1} adjustsFontSizeToFit>
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
    borderRadius: 10,
    marginBottom: 20,
  },
  expression: {
    color: '#888',
    fontSize: 20,
    textAlign: 'right',
    marginBottom: 5,
  },
  value: {
    color: 'white',
    fontSize: 40,
    textAlign: 'right',
  },
});


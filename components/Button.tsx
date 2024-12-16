import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ButtonProps {      
  onPress: () => void;
  title: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export default function Button({ onPress, title, color = '#f0f0f0', backgroundColor = '#333333', style }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }, style]}  
      onPress={onPress}
      activeOpacity={0.7}                                            
    >
      {typeof title === 'string' ? (
        <Text style={[styles.text, { color }]}>{title}</Text>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    margin: 6,
    borderRadius: 36,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontSize: 28,
    fontWeight: '500',
  },
});


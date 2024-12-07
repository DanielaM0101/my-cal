import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const conversions = [
  { label: 'Kilogramo a Libra', value: 'kg-lb' },
  { label: 'Libra a Kilogramo', value: 'lb-kg' },
  { label: 'Libra a Onza', value: 'lb-oz' },
  { label: 'Onza a Libra', value: 'oz-lb' },
];

interface ConversionModalProps {
  visible: boolean;
  onClose: () => void;
  onConvert: (conversion: string, value: number) => void;
  value: number;
}

export default function ConversionModal({ visible, onClose, onConvert, value }: ConversionModalProps) {
  const [selectedConversion, setSelectedConversion] = useState('kg-lb');

  const handleConvert = () => {
    onConvert(selectedConversion, value);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Conversión de Unidades</Text>
          
          <View style={styles.conversionDisplay}>
            <Text style={styles.conversionText}>{value} {selectedConversion.split('-')[0]}</Text>
          </View>

          <Picker
            selectedValue={selectedConversion}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedConversion(itemValue)}
          >
            {conversions.map((conv) => (
              <Picker.Item key={conv.value} label={conv.label} value={conv.value} />
            ))}
          </Picker>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleConvert}>
              <Text style={styles.buttonText}>Convertir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  conversionDisplay: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  conversionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


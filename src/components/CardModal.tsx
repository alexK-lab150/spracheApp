import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';

// @ts-ignore
export default function CreateCardModal({visible, onClose}) {
  const [german, setGerman] = useState('');
  const [russian, setRussian] = useState('');

  const handleSave = async () => {
    if (!german.trim() || !russian.trim()) {
      ToastAndroid.show(
        'Введение слова с переводом обязательные',
        ToastAndroid.SHORT,
      );
      return;
    }

    const newCard = {
      id: uuidv4(),
      german,
      russian,
      createdAt: new Date().toISOString(),
      set: null,
      stats: {
        correct: 0,
        wrong: 0,
      },
    };

    try {
      const jsonValue = await AsyncStorage.getItem('@spracheCards');
      const cards = jsonValue != null ? JSON.parse(jsonValue) : [];
      cards.push(newCard);
      await AsyncStorage.setItem('@spracheCards', JSON.stringify(cards));
      onClose();
      setGerman('');
      setRussian('');
    } catch (e) {
      console.error('Ошибка при сохранении карточки', e);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Слово на немецком</Text>
          <TextInput
            style={styles.input}
            value={german}
            onChangeText={setGerman}
            placeholder="например: Apfel"
          />
          <Text style={styles.label}>Перевод на русском</Text>
          <TextInput
            style={styles.input}
            value={russian}
            onChangeText={setRussian}
            placeholder="например: яблоко"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Сохранить</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#555',
  },
});

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
import {useDispatch, useSelector} from 'react-redux';
import {hideAddCardModal} from 'src/redux/slices/uiSlice';
import {addCard} from 'src/redux/slices/cardsSlice';
import {RootState} from 'src/redux/store';

interface AddCardModalProps {
  isVisible?: boolean;
}

const AddCardModal: React.FC<AddCardModalProps> = () => {
  const dispatch = useDispatch();
  const sets = useSelector((state: RootState) => state.sets.sets);
  const cards = useSelector((state: RootState) => state.cards.cards);
  const visible = useSelector(
    (state: RootState) => state.ui.isAddCardModalVisible,
  );
  const [wasWarned, setWasWarned] = useState(false);

  const [formData, setFormData] = useState({
    word: '',
    translation: '',
    synonym1: '',
    synonym2: '',
    selectedSetId: null as string | null,
    newSetName: '',
    newSetDescription: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSave = () => {
    const {word, translation, synonym1, synonym2, newSetName, selectedSetId} =
      formData;

    if (!word.trim() || !translation.trim()) {
      ToastAndroid.show('Введите слово и перевод', ToastAndroid.SHORT);
      return;
    }

    const duplicate = cards.some(
      card =>
        card.word.toLowerCase() === word.trim().toLowerCase() &&
        card.translation.toLowerCase() === translation.trim().toLowerCase(),
    );

    if (duplicate) {
      ToastAndroid.show('Такая карточка уже существует', ToastAndroid.SHORT);
      return;
    }

    if (!synonym1.trim() || !synonym2.trim()) {
      if (!wasWarned) {
        ToastAndroid.show(
          'Синонимы не указаны — карточка не будет участвовать в игре синонимов. Нажмите "Сохранить" ещё раз для подтверждения.',
          ToastAndroid.LONG,
        );
        setWasWarned(true);
        return;
      }
    }

    let setIdToUse = selectedSetId;

    if (newSetName.trim()) {
      const exists = sets.some(
        set => set.name.toLowerCase() === newSetName.trim().toLowerCase(),
      );

      if (exists) {
        ToastAndroid.show(
          `Набор "${newSetName.trim()}" уже существует. Придумайте уникальное имя`,
          ToastAndroid.LONG,
        );
        return;
      }
    }

    const synonyms = [synonym1.trim(), synonym2.trim()].filter(Boolean);

    dispatch(
      addCard({
        word: word.trim(),
        translation: translation.trim(),
        setId: setIdToUse || null,
        synonyms,
      }),
    );

    setFormData({
      word: '',
      translation: '',
      synonym1: '',
      synonym2: '',
      selectedSetId: null,
      newSetName: '',
      newSetDescription: '',
    });
    setWasWarned(false);

    dispatch(hideAddCardModal());
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Новая карточка</Text>

          <TextInput
            placeholder="Слово на немецком"
            style={styles.input}
            value={formData.word}
            onChangeText={text => handleInputChange('word', text)}
          />

          <TextInput
            placeholder="Перевод"
            style={styles.input}
            value={formData.translation}
            onChangeText={text => handleInputChange('translation', text)}
          />

          <TextInput
            placeholder="Синоним 1 (необязательно)"
            style={styles.input}
            value={formData.synonym1}
            onChangeText={text => handleInputChange('synonym1', text)}
          />

          <TextInput
            placeholder="Синоним 2 (необязательно)"
            style={styles.input}
            value={formData.synonym2}
            onChangeText={text => handleInputChange('synonym2', text)}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Сохранить</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => dispatch(hideAddCardModal())}>
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCardModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#ccc',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});

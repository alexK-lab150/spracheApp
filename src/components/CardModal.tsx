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
import {hideCardModal} from 'src/redux/slices/uiSlice';
import {addCard} from 'src/redux/slices/cardsSlice';
// import {addSet} from 'src/redux/slices/setsSlice';
import {RootState} from 'src/redux/store';

interface CardModalProps {
  isVisible?: boolean;
}

const CardModal: React.FC<CardModalProps> = () => {
  const dispatch = useDispatch();
  const sets = useSelector((state: RootState) => state.sets.sets);
  const cards = useSelector((state: RootState) => state.cards.cards);
  const visible = useSelector(
    (state: RootState) => state.ui.isCardModalVisible,
  );

  const [formData, setFormData] = useState({
    germanWord: '',
    translation: '',
    selectedSetId: null as string | null,
    newSetName: '',
    newSetDescription: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSave = () => {
    const {germanWord, translation, newSetName, selectedSetId} = formData;

    // Валидация
    if (!germanWord.trim() || !translation.trim()) {
      ToastAndroid.show('Введите слово и перевод', ToastAndroid.SHORT);
      return;
    }

    // Проверка на дубликат
    const duplicate = cards.some(
      card =>
        card.word.toLowerCase() === germanWord.trim().toLowerCase() &&
        card.translation.toLowerCase() === translation.trim().toLowerCase(),
    );

    if (duplicate) {
      ToastAndroid.show('Такая карточка уже существует', ToastAndroid.SHORT);
      return;
    }

    // Логика работы с набором
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

      // dispatch(
      //   addSet({
      //     name: newSetName.trim(),
      //     description: newSetDescription.trim(),
      //   }),
      // );
    }

    // Сохранение карточки
    dispatch(
      addCard({
        word: germanWord.trim(),
        translation: translation.trim(),
        setId: setIdToUse || null,
      }),
    );

    // Сброс формы
    setFormData({
      germanWord: '',
      translation: '',
      selectedSetId: null,
      newSetName: '',
      newSetDescription: '',
    });

    dispatch(hideCardModal());
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Новая карточка</Text>

          <TextInput
            placeholder="Слово на немецком"
            style={styles.input}
            value={formData.germanWord}
            onChangeText={text => handleInputChange('germanWord', text)}
          />

          <TextInput
            placeholder="Перевод"
            style={styles.input}
            value={formData.translation}
            onChangeText={text => handleInputChange('translation', text)}
          />

          {/*<Text style={styles.sectionTitle}>Или создайте новый набор:</Text>*/}

          {/*<TextInput*/}
          {/*  placeholder="Название набора"*/}
          {/*  style={styles.input}*/}
          {/*  value={formData.newSetName}*/}
          {/*  onChangeText={text => handleInputChange('newSetName', text)}*/}
          {/*/>*/}

          {/*<TextInput*/}
          {/*  placeholder="Описание набора (необязательно)"*/}
          {/*  style={styles.input}*/}
          {/*  value={formData.newSetDescription}*/}
          {/*  onChangeText={text => handleInputChange('newSetDescription', text)}*/}
          {/*/>*/}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Сохранить</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => dispatch(hideCardModal())}>
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CardModal;

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

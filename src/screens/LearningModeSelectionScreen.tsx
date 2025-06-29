import React, {useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setLearningModeSelectionVisible,
  setLearningScreenVisible,
  setSynonymGameVisible,
} from '../redux/slices/uiSlice';
import {RootState} from '../redux/store';
import {Card} from '../redux/slices/cardsSlice';

const LearningModeSelectionScreen = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards.cards);

  // Проверка доступности игры с синонимами
  const isSynonymGameAvailable = useMemo(() => {
    if (!cards || cards.length === 0) return false;

    const eligibleCards = cards.filter(
      (card: Card) =>
        (card.status === 'learning' || card.status === 'known') &&
        Array.isArray(card.synonyms) &&
        card.synonyms.length >= 2,
    );

    return eligibleCards.length >= 5;
  }, [cards]);

  const handleBack = () => {
    dispatch(setLearningModeSelectionVisible(false));
  };

  const goToLearning = () => {
    dispatch(setLearningModeSelectionVisible(false));
    dispatch(setLearningScreenVisible(true));
  };

  const goToSynonymGame = () => {
    if (!isSynonymGameAvailable) {
      showUnavailableReason();
      return;
    }
    dispatch(setLearningModeSelectionVisible(false));
    dispatch(setSynonymGameVisible(true));
  };

  const showUnavailableReason = () => {
    if (!cards || cards.length === 0) {
      ToastAndroid.show('Нет доступных карточек', ToastAndroid.LONG);
      return;
    }

    const eligibleCount = cards.filter(
      (card: Card) =>
        (card.status === 'learning' || card.status === 'known') &&
        Array.isArray(card.synonyms) &&
        card.synonyms.length >= 2,
    ).length;

    if (eligibleCount === 0) {
      ToastAndroid.show('Нет карточек с синонимами', ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        `Недостаточно карточек с синонимами (${eligibleCount}/5)`,
        ToastAndroid.LONG,
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backText}>{'<'} Назад</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Выберите режим обучения</Text>

      <TouchableOpacity style={styles.button} onPress={goToLearning}>
        <Text style={styles.buttonText}>Обычное обучение</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          !isSynonymGameAvailable && styles.disabledButton,
        ]}
        onPress={goToSynonymGame}
        disabled={!isSynonymGameAvailable}>
        <Text
          style={[
            styles.buttonText,
            !isSynonymGameAvailable && styles.disabledText,
          ]}>
          Игра синонимы
        </Text>
        {!isSynonymGameAvailable && (
          <Text style={styles.hintText}>
            {cards.length === 0
              ? 'Нет данных'
              : 'Недостаточно карточек с синонимами'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#666666',
  },
  hintText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
});

export default LearningModeSelectionScreen;

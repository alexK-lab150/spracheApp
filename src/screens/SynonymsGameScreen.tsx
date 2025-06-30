import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  submitSynonymAnswer,
  nextSynonymCard,
} from '../redux/slices/synonymGameSlice';

const SynonymsGameScreen = () => {
  const dispatch = useDispatch();
  const {
    currentCard,
    originalTargetWord,
    hintSynonyms,
    attemptsLeft,
    openedLetters,
    showAnswer,
    isCorrectAnswer,
  } = useSelector((state: RootState) => state.synonymGame);

  const allCards = useSelector((state: RootState) => state.cards.cards);
  const [userInput, setUserInput] = useState('');

  const validCards = useMemo(
    () => allCards.filter(card => card.synonyms?.length >= 1),
    [allCards],
  );

  useEffect(() => {
    if (!currentCard && validCards.length > 0) {
      dispatch(nextSynonymCard(validCards));
    }
  }, [currentCard, validCards, dispatch]);

  const handleSubmit = () => {
    if (userInput.trim()) {
      dispatch(submitSynonymAnswer(userInput));
      setUserInput('');
    }
  };

  const handleNext = () => {
    dispatch(nextSynonymCard(validCards));
    setUserInput('');
  };

  if (!currentCard || !originalTargetWord) {
    return (
      <View style={styles.center}>
        <Text style={styles.doneText}>Нет доступных карточек</Text>
      </View>
    );
  }

  // Формируем подсказку с учетом регистра оригинального слова
  const maskedWord = originalTargetWord
    .split('')
    .map((char: string, idx: number) =>
      openedLetters.includes(idx) ? char : '_',
    )
    .join('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Угадай слово по синонимам</Text>

      <View style={styles.synonymsBox}>
        {hintSynonyms.map((synonym, index) => (
          <Text key={index} style={styles.synonym}>
            {synonym}
          </Text>
        ))}
      </View>

      <Text style={styles.label}>Введите слово:</Text>

      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        editable={!showAnswer}
        placeholder="Ваш ответ"
        placeholderTextColor="#888"
        autoCapitalize="none"
      />

      {openedLetters.length > 0 && !showAnswer && (
        <Text style={styles.hint}>Подсказка: {maskedWord}</Text>
      )}

      {!showAnswer ? (
        <>
          <TouchableOpacity
            style={[styles.button, !userInput.trim() && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!userInput.trim()}>
            <Text style={styles.buttonText}>Проверить</Text>
          </TouchableOpacity>
          <Text style={styles.attempts}>Осталось попыток: {attemptsLeft}</Text>
        </>
      ) : (
        <>
          <Text
            style={[
              styles.result,
              isCorrectAnswer ? styles.success : styles.error,
            ]}>
            {isCorrectAnswer
              ? 'Правильно!'
              : `Неверно. Ответ: ${originalTargetWord}`}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Следующее слово</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  synonymsBox: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  synonym: {
    color: '#A0E3A0',
    fontSize: 18,
    marginBottom: 8,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
    padding: 12,
    borderRadius: 8,
  },
  success: {
    backgroundColor: '#1B5E2030',
    color: '#4CAF50',
  },
  error: {
    backgroundColor: '#B71C1C30',
    color: '#F44336',
  },
  attempts: {
    color: '#FF9800',
    textAlign: 'center',
    fontSize: 16,
  },
  hint: {
    color: '#FFA500',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'monospace',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  doneText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default SynonymsGameScreen;

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
    targetWord,
    hintSynonyms,
    attemptsLeft,
    openedLetters,
    showAnswer,
  } = useSelector((state: RootState) => state.synonymGame);

  const allCards = useSelector((state: RootState) => state.cards.cards);
  const [userInput, setUserInput] = useState('');

  // ✅ Мемоизируем список подходящих карточек
  const validCards = useMemo(
    () => allCards.filter(card => card.synonyms && card.synonyms.length >= 1),
    [allCards],
  );

  // ✅ Вызываем nextSynonymCard один раз при монтировании, если ещё нет карточки
  useEffect(() => {
    if (!currentCard && validCards.length > 0) {
      dispatch(nextSynonymCard(validCards));
    }
  }, [currentCard, validCards, dispatch]);

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    dispatch(submitSynonymAnswer(userInput.trim()));
    setUserInput('');
  };

  const handleNext = () => {
    dispatch(nextSynonymCard(validCards));
    setUserInput('');
  };

  if (!currentCard || !targetWord) {
    return (
      <View style={styles.center}>
        <Text style={styles.doneText}>Нет доступных карточек</Text>
      </View>
    );
  }

  const maskedWord = targetWord
    .split('')
    .map((char, idx) => (openedLetters.includes(idx) ? char : '_'))
    .join('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Угадай слово по синонимам</Text>

      <View style={styles.synonymsBox}>
        {hintSynonyms.map((synonym: string, index: number) => (
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
      />

      {openedLetters.length > 0 && !showAnswer && (
        <Text style={styles.hint}>Подсказка: {maskedWord}</Text>
      )}

      {!showAnswer ? (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Проверить</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.result}>
            {userInput.trim().toLowerCase() === targetWord.toLowerCase()
              ? 'Правильно!'
              : `Неверно. Ответ: ${targetWord}`}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Следующее слово</Text>
          </TouchableOpacity>
        </>
      )}

      {!showAnswer && (
        <Text style={styles.attempts}>Осталось попыток: {attemptsLeft}</Text>
      )}
    </View>
  );
};

export default SynonymsGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  synonymsBox: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  synonym: {
    color: '#a0e3a0',
    fontSize: 18,
    marginBottom: 5,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  result: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  attempts: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  hint: {
    color: '#ffa500',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  doneText: {
    color: '#fff',
    fontSize: 18,
  },
});

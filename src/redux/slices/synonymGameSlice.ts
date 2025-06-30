import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Card} from '../slices/cardsSlice';

interface SynonymGameState {
  currentCard: Card | null;
  targetWord: string | null;
  originalTargetWord: string | null;
  hintSynonyms: string[];
  attemptsLeft: number;
  openedLetters: number[];
  showAnswer: boolean;
  recentlyUsedCardIds: string[];
  isCorrectAnswer: boolean;
}

const initialState: SynonymGameState = {
  currentCard: null,
  targetWord: null,
  originalTargetWord: null,
  hintSynonyms: [],
  attemptsLeft: 3,
  openedLetters: [],
  showAnswer: false,
  recentlyUsedCardIds: [],
  isCorrectAnswer: false,
};

const synonymGameSlice = createSlice({
  name: 'synonymGame',
  initialState,
  reducers: {
    nextSynonymCard(state, action: PayloadAction<Card[]>) {
      const allCards = action.payload;
      const availableCards = allCards.filter(
        card =>
          card.synonyms.length >= 1 &&
          !state.recentlyUsedCardIds.includes(card.id),
      );

      if (availableCards.length === 0) {
        return initialState;
      }

      const randomCard =
        availableCards[Math.floor(Math.random() * availableCards.length)];
      const allWords = [...randomCard.synonyms, randomCard.word];
      const targetIndex = Math.floor(Math.random() * allWords.length);
      const targetWord = allWords[targetIndex];

      state.currentCard = randomCard;
      state.targetWord = targetWord.toLowerCase(); // Для проверки
      state.originalTargetWord = targetWord; // Для отображения
      state.hintSynonyms = allWords.filter((_, i) => i !== targetIndex);
      state.attemptsLeft = 3;
      state.openedLetters = [];
      state.showAnswer = false;
      state.isCorrectAnswer = false;

      state.recentlyUsedCardIds.unshift(randomCard.id);
      if (state.recentlyUsedCardIds.length > 5) {
        state.recentlyUsedCardIds = state.recentlyUsedCardIds.slice(0, 5);
      }
    },

    submitSynonymAnswer(state, action: PayloadAction<string>) {
      const answer = action.payload.trim().toLowerCase();
      if (!state.targetWord || state.showAnswer) return;

      state.isCorrectAnswer = answer === state.targetWord;

      if (state.isCorrectAnswer) {
        state.showAnswer = true;
      } else {
        state.attemptsLeft -= 1;

        // Логика открытия букв
        const hiddenIndices = [...state.targetWord]
          .map((_, i) => i)
          .filter(i => !state.openedLetters.includes(i));

        if (hiddenIndices.length > 0) {
          // Первая ошибка - открываем первую букву
          if (state.attemptsLeft === 2 && !state.openedLetters.includes(0)) {
            state.openedLetters.push(0);
          }
          // Последующие ошибки - случайные буквы
          else if (hiddenIndices.length > 0) {
            const randomIndex =
              hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
            state.openedLetters.push(randomIndex);
          }
        }

        state.showAnswer = state.attemptsLeft === 0;
      }
    },

    resetSynonymGame: () => initialState,
  },
});

export const {nextSynonymCard, submitSynonymAnswer, resetSynonymGame} =
  synonymGameSlice.actions;
export default synonymGameSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Card} from '../slices/cardsSlice';

interface SynonymGameState {
  currentCard: Card | null;
  targetWord: string | null;
  hintSynonyms: string[];
  attemptsLeft: number;
  openedLetters: number[];
  showAnswer: boolean;
  recentlyUsedCardIds: string[];
}

const initialState: SynonymGameState = {
  currentCard: null,
  targetWord: null,
  hintSynonyms: [],
  attemptsLeft: 3,
  openedLetters: [],
  showAnswer: false,
  recentlyUsedCardIds: [],
};

const synonymGameSlice = createSlice({
  name: 'synonymGame',
  initialState,
  reducers: {
    // Главная логика старта и выбора карточки — теперь здесь
    nextSynonymCard(state, action: PayloadAction<Card[]>) {
      const allCards = action.payload;
      const availableCards = allCards.filter(
        card =>
          card.synonyms.length >= 1 &&
          !state.recentlyUsedCardIds.includes(card.id),
      );

      if (availableCards.length === 0) {
        // Если подходящих карточек нет — просто очищаем
        state.currentCard = null;
        state.targetWord = null;
        state.hintSynonyms = [];
        state.attemptsLeft = 3;
        state.openedLetters = [];
        state.showAnswer = false;
        return;
      }

      const randomCard =
        availableCards[Math.floor(Math.random() * availableCards.length)];
      const allWords = [...randomCard.synonyms, randomCard.word];
      const targetIndex = Math.floor(Math.random() * allWords.length);
      const targetWord = allWords[targetIndex];
      const hintSynonyms = allWords.filter((_, i) => i !== targetIndex);

      state.currentCard = randomCard;
      state.targetWord = targetWord.toLowerCase();
      state.hintSynonyms = hintSynonyms;
      state.attemptsLeft = 3;
      state.openedLetters = [];
      state.showAnswer = false;

      state.recentlyUsedCardIds.unshift(randomCard.id);
      if (state.recentlyUsedCardIds.length > 5) {
        state.recentlyUsedCardIds = state.recentlyUsedCardIds.slice(0, 5);
      }
    },

    submitSynonymAnswer(state, action: PayloadAction<string>) {
      const answer = action.payload.trim().toLowerCase();
      if (!state.targetWord || !state.currentCard) return;

      if (answer === state.targetWord) {
        state.showAnswer = true;
      } else {
        state.attemptsLeft -= 1;

        const availableIndices = [...state.targetWord]
          .map((_, i) => i)
          .filter(i => !state.openedLetters.includes(i));

        if (availableIndices.length > 0) {
          const randomIndex =
            availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ];
          state.openedLetters.push(randomIndex);
        }

        if (state.attemptsLeft === 0) {
          state.showAnswer = true;
        }
      }
    },

    resetSynonymGame(state) {
      state.currentCard = null;
      state.targetWord = null;
      state.hintSynonyms = [];
      state.attemptsLeft = 3;
      state.openedLetters = [];
      state.showAnswer = false;
      state.recentlyUsedCardIds = [];
    },
  },
});

export const {nextSynonymCard, submitSynonymAnswer, resetSynonymGame} =
  synonymGameSlice.actions;

export default synonymGameSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {generateCustomId} from '../../utils/polifils';
import {ToastAndroid} from 'react-native';

export interface Card {
  id: string;
  word: string;
  translation: string;
  setId: string | null;
  rating: number;
  status: 'new' | 'learning' | 'known';
  createdAt: number;
  synonyms: string[];
}

interface CardsState {
  cards: Card[];
}

const initialState: CardsState = {
  cards: [],
};

// prepareAddCard is responsible for preparing and normalizing the data
// before it reaches the reducer. It ensures all required fields are generated,
// such as unique id, timestamp, and default status, and that inputs are sanitized.
const prepareAddCard = ({
  word,
  translation,
  setId,
  synonyms = [],
}: {
  word: string;
  translation: string;
  setId?: string | null;
  synonyms?: string[];
}) => {
  return {
    payload: {
      id: generateCustomId(),
      word: word.trim(),
      translation: translation.trim(),
      setId: setId ?? null,
      status: 'new' as const,
      rating: 0,
      createdAt: Date.now(),
      synonyms,
    },
  };
};

type AddCardPayload = ReturnType<typeof prepareAddCard>['payload'];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: {
      reducer: (state, action: PayloadAction<AddCardPayload>) => {
        const {word, translation} = action.payload;

        const isDuplicate = state.cards.some(
          c =>
            c.word.trim().toLowerCase() === word.trim().toLowerCase() &&
            c.translation.trim().toLowerCase() ===
              translation.trim().toLowerCase(),
        );

        if (isDuplicate) {
          ToastAndroid.show(
            `Карточка уже существует: ${word} — ${translation}`,
            ToastAndroid.LONG,
          );
          return;
        }

        state.cards.push(action.payload);
      },
      prepare: prepareAddCard,
    },

    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },

    updateCard: (
      state,
      action: PayloadAction<Partial<Card> & {id: string}>,
    ) => {
      const index = state.cards.findIndex(
        card => card.id === action.payload.id,
      );
      if (index !== -1) {
        state.cards[index] = {
          ...state.cards[index],
          ...action.payload,
        };
      }
    },

    // обновления рейтинга карточки и статуса обучения
    updateCardRating: (
      state,
      action: PayloadAction<{id: string; delta: number}>,
    ) => {
      const {id, delta} = action.payload;
      const card = state.cards.find(c => c.id === id);
      if (!card) return;

      card.rating = Math.max(0, card.rating + delta); // рейтинг не ниже 0

      // обновление статуса в зависимости от рейтинга
      if (card.rating >= 50) {
        card.status = 'known';
      } else if (card.rating >= 30) {
        card.status = 'learning';
      } else {
        card.status = 'new';
      }
    },

    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },

    clearCards: state => {
      state.cards = [];
    },
  },
});

export const {
  addCard,
  removeCard,
  updateCard,
  updateCardRating,
  setCards,
  clearCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;

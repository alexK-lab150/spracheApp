import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {ToastAndroid} from 'react-native';

export interface Card {
  id: string;
  word: string;
  translation: string;
  setId: string | null;
  status: 'new' | 'learning' | 'known';
  createdAt: number;
}

interface CardsState {
  cards: Card[];
}

const initialState: CardsState = {
  cards: [],
};

const prepareAddCard = ({
  word,
  translation,
  setId,
}: {
  word: string;
  translation: string;
  setId?: string | null;
}) => {
  return {
    payload: {
      id: uuidv4(),
      word: word.trim(),
      translation: translation.trim(),
      setId: setId ?? null,
      status: 'new' as const,
      createdAt: Date.now(),
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

    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },

    clearCards: state => {
      state.cards = [];
    },
  },
});

export const {addCard, removeCard, updateCard, setCards, clearCards} =
  cardsSlice.actions;

export default cardsSlice.reducer;

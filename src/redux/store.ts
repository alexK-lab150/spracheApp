import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cardsReducer from './slices/cardsSlice';
import setsReducer from './slices/setsSlice';
import uiReducer from './slices/uiSlice';
import ratingReducer from './slices/ratingSlice';

import {USE_TEST_CARDS} from 'src/utils/devConfig';

const rootReducer = combineReducers({
  cards: cardsReducer,
  sets: setsReducer,
  ui: uiReducer,
  rating: ratingReducer,
});

const finalReducer = USE_TEST_CARDS
  ? persistReducer(
      {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['sets'], // Исключаем 'cards' в тестовом режиме
      },
      rootReducer,
    )
  : persistReducer(
      {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['cards', 'sets'], // Полный persist в обычном режиме
      },
      rootReducer,
    );

export const store = configureStore({
  reducer: finalReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

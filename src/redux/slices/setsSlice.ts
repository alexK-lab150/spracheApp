import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

export type Set = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  updatedAt: number;
};

interface SetsState {
  sets: Set[];
}

const initialState: SetsState = {
  sets: [],
};

const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    addSet: (
      state,
      action: PayloadAction<{name: string; description: string}>,
    ) => {
      const {name, description} = action.payload;

      // Проверка на дубликат имени
      const duplicate = state.sets.find(
        set => set.name.toLowerCase() === name.trim().toLowerCase(),
      );
      if (duplicate) {
        throw new Error(`Набор "${name}" уже существует.`);
      }

      const newSet: Set = {
        id: uuidv4(),
        name: name.trim(),
        description: description.trim(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      state.sets.push(newSet);
    },

    renameSet: (
      state,
      action: PayloadAction<{id: string; newName: string}>,
    ) => {
      const {id, newName} = action.payload;

      // Проверка уникальности нового имени
      const duplicate = state.sets.find(
        set => set.name.toLowerCase() === newName.trim().toLowerCase(),
      );
      if (duplicate) {
        throw new Error(`Набор "${newName}" уже существует.`);
      }

      const set = state.sets.find(s => s.id === id);
      if (set) {
        set.name = newName.trim();
        set.updatedAt = Date.now();
      }
    },

    updateSetDescription: (
      state,
      action: PayloadAction<{id: string; newDescription: string}>,
    ) => {
      const set = state.sets.find(s => s.id === action.payload.id);
      if (set) {
        set.description = action.payload.newDescription.trim();
        set.updatedAt = Date.now();
      }
    },

    deleteSet: (state, action: PayloadAction<string>) => {
      state.sets = state.sets.filter(set => set.id !== action.payload);
    },

    updateSetTimestamp: (state, action: PayloadAction<string>) => {
      const set = state.sets.find(s => s.id === action.payload);
      if (set) {
        set.updatedAt = Date.now();
      }
    },
  },
});

export const {
  addSet,
  renameSet,
  updateSetDescription,
  deleteSet,
  updateSetTimestamp,
} = setsSlice.actions;

export default setsSlice.reducer;

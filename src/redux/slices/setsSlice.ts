import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {generateCustomId} from '../../utils/polifils';

export type SetCategory =
  | 'umschulung'
  | 'alltag'
  | 'beruf'
  | 'akademisch'
  | 'medizin';

export type Set = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  category: SetCategory;
};

type SetsState = {
  sets: Set[];
};

const initialState: SetsState = {
  sets: [],
};

const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    addSet: (
      state,
      action: PayloadAction<{
        name: string;
        description: string;
        category: SetCategory;
      }>,
    ) => {
      const {name, description, category} = action.payload;

      const normalizedName = name.trim().toLowerCase();
      const isDuplicate = state.sets.some(
        set => set.name.toLowerCase() === normalizedName,
      );
      if (isDuplicate) {
        throw new Error(`Набор "${name}" уже существует.`);
      }

      const newSet: Set = {
        id: generateCustomId(),
        name: name.trim(),
        description: description.trim(),
        category,
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

      const isDuplicate = state.sets.some(
        set => set.name.toLowerCase() === newName.trim().toLowerCase(),
      );
      if (isDuplicate) {
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

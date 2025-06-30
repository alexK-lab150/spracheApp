import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Screen = 'home' | 'library' | 'account';
type LearningMode = 'standard' | 'synonyms';

interface HeaderConfig {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
  showRating?: boolean;
}

interface UIState {
  isAddCardModalVisible: boolean;
  isLearningScreenVisible: boolean;
  isLearningModeSelectionVisible: boolean;
  isSynonymGameVisible: boolean;
  activeScreen: Screen;
  headerConfig: HeaderConfig;
  learningMode: LearningMode;
}

const initialState: UIState = {
  isAddCardModalVisible: false,
  isLearningScreenVisible: false,
  isLearningModeSelectionVisible: false,
  isSynonymGameVisible: false,
  activeScreen: 'home',
  learningMode: 'standard',
  headerConfig: {
    title: 'Home',
    showSearch: true,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showAddCardModal(state) {
      state.isAddCardModalVisible = true;
    },
    hideAddCardModal(state) {
      state.isAddCardModalVisible = false;
    },
    showLearningScreen(state) {
      state.isLearningScreenVisible = true;
    },
    hideLearningScreen(state) {
      state.isLearningScreenVisible = false;
    },
    showLearningModeSelection(state) {
      state.isLearningModeSelectionVisible = true;
    },
    hideLearningModeSelection(state) {
      state.isLearningModeSelectionVisible = false;
    },
    showSynonymGame(state) {
      state.isSynonymGameVisible = true;
    },
    hideSynonymGame(state) {
      state.isSynonymGameVisible = false;
    },
    setLearningMode(state, action: PayloadAction<LearningMode>) {
      state.learningMode = action.payload;
    },
    setActiveScreen(state, action: PayloadAction<Screen>) {
      state.activeScreen = action.payload;
    },
    setHeaderConfig(state, action: PayloadAction<HeaderConfig>) {
      state.headerConfig = action.payload;
    },

    // переключатели вида игры
    setLearningModeSelectionVisible(state, action: PayloadAction<boolean>) {
      state.isLearningModeSelectionVisible = action.payload;
    },
    setLearningScreenVisible(state, action: PayloadAction<boolean>) {
      state.isLearningScreenVisible = action.payload;
    },
    setSynonymGameVisible(state, action: PayloadAction<boolean>) {
      state.isSynonymGameVisible = action.payload;
    },
  },
});

export const {
  showAddCardModal,
  hideAddCardModal,
  showLearningScreen,
  hideLearningScreen,
  showLearningModeSelection,
  hideLearningModeSelection,
  showSynonymGame,
  hideSynonymGame,
  setLearningMode,
  setActiveScreen,
  setHeaderConfig,
  setLearningModeSelectionVisible,
  setLearningScreenVisible,
  setSynonymGameVisible,
} = uiSlice.actions;

export default uiSlice.reducer;
